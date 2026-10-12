import { Page } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-008 in the web: the plan, its history and the WebSocket of the chat are answered in the browser, so the test needs
 * no chat service and creates nothing. Only the sign-in goes to Keycloak.
 */
const PLAN_ID = '7e5c0b9a-2f1d-4c3e-9a8b-0e8d7c6b5a49';
const ENDS_AT = new Date(Date.now() + 3 * 3600_000).toISOString();

const answerPlanAndHistory = async (page: Page, open: boolean) => {
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) =>
      route.fulfill({ json: { id: PLAN_ID, title: 'Pádel 2 contra 2', participants: [] } }),
  );
  await page.route(
    (url) => url.pathname === `/api/v1/chats/${PLAN_ID}/messages`,
    (route) =>
      route.fulfill({
        json: {
          planId: PLAN_ID,
          open,
          endsAt: ENDS_AT,
          messages: [
            {
              id: 'm1',
              authorId: 'lucia',
              authorName: 'Lucía',
              text: '¿Quién trae bolas?',
              sentAt: new Date().toISOString(),
            },
          ],
        },
      }),
  );
};

test('talks with the group of a plan in real time, by keyboard', async ({ openPage, t }) => {
  const page = await openPage();
  await answerPlanAndHistory(page, true);
  const sent: string[] = [];
  await page.routeWebSocket(
    (url) => url.pathname === '/ws/chat',
    (ws) => {
      ws.send(JSON.stringify({ type: 'ready', open: true, endsAt: ENDS_AT }));
      ws.onMessage((frame) => {
        const { text } = JSON.parse(String(frame)) as { text: string };
        sent.push(text);
        const message = { id: `m${sent.length + 1}`, authorId: 'ana', authorName: 'Ana', text };
        ws.send(
          JSON.stringify({
            type: 'message',
            message: { ...message, sentAt: new Date().toISOString() },
          }),
        );
      });
    },
  );

  await page.goto(`/plans/${PLAN_ID}/chat`);
  await signIn(page, ANA);

  const log = page.getByRole('log', { name: t('chat.title') });
  await expect(log).toContainText('¿Quién trae bolas?');
  await expect(page.locator('.chat-plan')).toContainText('Pádel 2 contra 2');
  const field = page.getByRole('textbox', { name: t('chat.label') });
  await field.fill('Yo las llevo');
  await field.press('Enter');

  await expect(log).toContainText('Yo las llevo');
  await expect(field).toHaveValue('');
  expect(sent).toEqual(['Yo las llevo']);
});

test('shows the chat of a plan that is over as read-only', async ({ openPage, t }) => {
  const page = await openPage();
  await answerPlanAndHistory(page, false);
  await page.routeWebSocket(
    (url) => url.pathname === '/ws/chat',
    (ws) => ws.send(JSON.stringify({ type: 'ready', open: false, endsAt: ENDS_AT })),
  );

  await page.goto(`/plans/${PLAN_ID}/chat`);
  await signIn(page, ANA);

  await expect(page.getByRole('log', { name: t('chat.title') })).toContainText(
    '¿Quién trae bolas?',
  );
  await expect(page.locator('.chat-read-only')).toContainText(t('chat.readOnly'));
  await expect(page.getByRole('textbox', { name: t('chat.label') })).toHaveCount(0);
});
