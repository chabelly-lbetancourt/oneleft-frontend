import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { SocialApi } from '../../core/api/social-api';
import { Connection, SocialPerson } from '../../shared/model/social';
import { PersonPage } from './person-page';

const ANA: SocialPerson = {
  userId: 'ana',
  name: 'Ana Pruebas',
  visibility: 'PRIVATE',
  followers: 3,
  following: 1,
  relation: 'NONE',
  followsMe: false,
};

describe('PersonPage', () => {
  let fixture: ComponentFixture<PersonPage>;
  const api = {
    person: vi.fn((): Observable<SocialPerson> => of(ANA)),
    follow: vi.fn((): Observable<Connection> => of({} as Connection)),
    unfollow: vi.fn((): Observable<void> => of(undefined)),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async (person: SocialPerson | Error = ANA) => {
    api.person.mockReturnValue(person instanceof Error ? throwError(() => person) : of(person));
    fixture = TestBed.createComponent(PersonPage);
    fixture.componentRef.setInput('id', 'ana');
    await render();
  };
  const click = async (selector: string) => {
    element().querySelector<HTMLButtonElement>(`${selector} button`)!.click();
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [PersonPage, translocoTesting()],
      providers: [provideRouter([]), { provide: SocialApi, useValue: api }],
    });
  });

  it('should show the person, their counts and that their profile is private', async () => {
    await create({ ...ANA, followsMe: true });

    expect(api.person).toHaveBeenCalledWith('ana');
    expect(element().querySelector('.person-card__name')?.textContent).toContain('Ana Pruebas');
    expect(element().querySelector('.person-card__avatar')?.textContent).toContain('AP');
    expect(element().querySelector('.private-tag')?.textContent).toContain('Perfil privado');
    expect(element().querySelector('.follows-you')?.textContent).toContain('Te sigue');
    expect(element().querySelector('.followers-count')?.textContent).toBe('3');
    expect(element().querySelector('.following-count')?.textContent).toBe('1');
  });

  it('should ask to follow a private profile and then say the request is waiting', async () => {
    await create();
    expect(element().querySelector('.follow-button')?.textContent).toContain('Pedir seguir');
    expect(element().textContent).toContain('Ana Pruebas tendrá que aceptar tu solicitud');

    api.person.mockReturnValue(of({ ...ANA, relation: 'REQUESTED' }));
    await click('.follow-button');

    expect(api.follow).toHaveBeenCalledWith('ana');
    expect(element().querySelector('.requested-message')?.textContent).toContain(
      'Solicitud enviada',
    );

    api.person.mockReturnValue(of(ANA));
    await click('.cancel-request');
    expect(api.unfollow).toHaveBeenCalledWith('ana');
    expect(element().querySelector('.follow-button')).not.toBeNull();
  });

  it('should follow a public profile at once and stop following it', async () => {
    await create({ ...ANA, visibility: 'PUBLIC' });
    expect(element().querySelector('.follow-button')?.textContent).toContain('Seguir');
    expect(element().querySelector('.private-tag')).toBeNull();

    api.person.mockReturnValue(
      of({ ...ANA, visibility: 'PUBLIC', relation: 'FOLLOWING', followers: 4 }),
    );
    await click('.follow-button');
    expect(element().querySelector('.following-message')?.textContent).toContain(
      'Sigues a Ana Pruebas',
    );
    expect(element().querySelector('.followers-count')?.textContent).toBe('4');

    await click('.unfollow-button');
    expect(api.unfollow).toHaveBeenCalledWith('ana');
  });

  it('should lead to my network on my own page', async () => {
    await create({ ...ANA, relation: 'SELF' });

    expect(element().querySelector('.see-network')?.getAttribute('href')).toBe('/network');
    expect(element().querySelector('.follow-button')).toBeNull();
  });

  it('should explain why following failed', async () => {
    await create();
    api.follow.mockReturnValueOnce(
      throwError(
        () => new HttpErrorResponse({ status: 503, error: { code: 'social.unavailable' } }),
      ),
    );

    await click('.follow-button');

    expect(element().querySelector('.social-error')?.textContent).toContain(
      'Ahora mismo no se puede seguir a nadie',
    );
    expect(element().querySelector('.follow-button button')?.hasAttribute('disabled')).toBe(false);
  });

  it('should say when the person does not exist', async () => {
    await create(new Error('404'));

    expect(element().querySelector('.person-not-found')?.textContent).toContain(
      'Esta persona no existe',
    );
  });
});
