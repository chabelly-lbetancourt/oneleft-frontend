// Service worker of the notices of nearby plans (HU-006): shows the Web Push messages of the notifications service
// as system notifications, also with OneLeft closed, and opens the plan when one is tapped.
// The message comes encrypted from the server (RFC 8291); the browser decrypts it before this worker sees it.

self.addEventListener('push', (event) => {
  const message = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(message.title || 'OneLeft', {
      body: message.body || '',
      // One notification per plan: a repeated message replaces it instead of piling up
      tag: message.tag,
      icon: '/icons/notification-icon.png',
      badge: '/icons/notification-badge.png',
      data: { url: message.url || '/' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || '/', self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
      const open = windows.find((window) => window.url === url);
      return open ? open.focus() : self.clients.openWindow(url);
    }),
  );
});
