import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UsersApi } from '@core/api/users-api';
import { Demographics } from '@shared/model/demographics';
import { translocoTesting } from '@testing/transloco-testing';
import { DemographicsCard } from './demographics';

describe('DemographicsCard', () => {
  let fixture: ComponentFixture<DemographicsCard>;
  const api = { demographics: vi.fn(), saveDemographics: vi.fn() };
  const element = () => fixture.nativeElement as HTMLElement;
  const mine: Demographics = {
    birthDate: '1998-04-12',
    gender: 'WOMAN',
    ageBand: { from: 25, to: 29, label: '25–29' },
    changesLeft: 2,
  };
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async () => {
    TestBed.configureTestingModule({
      imports: [DemographicsCard, translocoTesting()],
      providers: [{ provide: UsersApi, useValue: api }, provideRouter([])],
    });
    fixture = TestBed.createComponent(DemographicsCard);
    await render();
  };

  beforeEach(() => vi.clearAllMocks());

  it('should show what is saved with the age band and the changes left', async () => {
    api.demographics.mockReturnValue(of(mine));
    await create();

    expect(element().querySelector<HTMLInputElement>('#birth-date')!.value).toBe('1998-04-12');
    expect(element().querySelector('.demographics__band')!.textContent).toContain('25–29');
  });

  it('should start empty and with nothing to save while no date and gender are chosen', async () => {
    api.demographics.mockReturnValue(throwError(() => ({ status: 404 })));
    await create();

    expect(element().querySelector<HTMLInputElement>('#birth-date')!.value).toBe('');
    expect(element().querySelector('.demographics__band')).toBeNull();
    expect(element().querySelector<HTMLButtonElement>('.demographics__save button')!.disabled).toBe(
      true,
    );
  });

  it('should save the date and gender and say it was saved', async () => {
    api.demographics.mockReturnValue(of(mine));
    api.saveDemographics.mockReturnValue(of(mine));
    await create();

    element().querySelector<HTMLButtonElement>('.demographics__save button')!.click();
    await render();

    expect(api.saveDemographics).toHaveBeenCalledWith({ birthDate: '1998-04-12', gender: 'WOMAN' });
    expect(element().querySelector('.demographics__done')).not.toBeNull();
  });

  it('should show the error of the service when it refuses the date', async () => {
    api.demographics.mockReturnValue(of(mine));
    api.saveDemographics.mockReturnValue(
      throwError(() => ({ error: { code: 'demographics.minor' } })),
    );
    await create();

    element().querySelector<HTMLButtonElement>('.demographics__save button')!.click();
    await render();

    expect(element().querySelector('.demographics__error')).not.toBeNull();
  });

  it('should link to the privacy policy that explains the legal basis (HU-070)', () => {
    const link = (fixture.nativeElement as HTMLElement).querySelector('.demographics__legal');

    expect(link?.getAttribute('href')).toBe('/privacy');
    expect(link?.textContent).toContain('consentimiento');
  });
});
