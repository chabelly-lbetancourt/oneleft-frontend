import { TestBed } from '@angular/core/testing';
import { PersonAvatar } from './person-avatar';

describe('PersonAvatar', () => {
  const render = (inputs: Record<string, unknown>) => {
    TestBed.configureTestingModule({ imports: [PersonAvatar] });
    const fixture = TestBed.createComponent(PersonAvatar);
    Object.entries(inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
    fixture.detectChanges();
    return fixture;
  };

  it('should show the initials of whoever has no photo', () => {
    const element = render({ name: 'lucía  martín gómez' }).nativeElement as HTMLElement;

    expect(element.querySelector('.p-avatar')?.textContent?.trim()).toBe('LM');
    expect(element.querySelector('img')).toBeNull();
    expect(element.querySelector('.p-avatar')?.classList).toContain('avatar--participant');
  });

  it('should show the photo, decorative next to the name, in the look of each place', () => {
    const element = render({
      name: 'Lucía Martín',
      photo: 'http://localhost:7070/oneleft-photos/photos/l/1.webp?X-Amz-Signature=x',
      variant: 'profile',
      size: 'xlarge',
    }).nativeElement as HTMLElement;

    const photo = element.querySelector('img.avatar__photo')!;
    expect(photo.getAttribute('src')).toContain('/photos/l/1.webp');
    expect(photo.getAttribute('alt')).toBe('');
    expect(element.textContent?.trim()).toBe('');
    const avatar = element.querySelector('.p-avatar')!;
    expect(avatar.classList).toContain('avatar--profile');
    expect(avatar.classList).toContain('avatar--photo');
    expect(avatar.classList).toContain('p-avatar-xl');
  });

  it('should go back to the initials when the link of the photo expired, and try a new link', () => {
    const fixture = render({ name: 'Ana Test', photo: 'http://storage.test/old' });
    const element = fixture.nativeElement as HTMLElement;

    element.querySelector('img')!.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(element.querySelector('img')).toBeNull();
    expect(element.textContent?.trim()).toBe('AT');

    fixture.componentRef.setInput('photo', 'http://storage.test/new');
    fixture.detectChanges();
    expect(element.querySelector('img')?.getAttribute('src')).toBe('http://storage.test/new');
  });

  it('should fit inline next to a name', () => {
    const element = render({ name: 'Ana', size: 'small' }).nativeElement as HTMLElement;
    const avatar = element.querySelector('.p-avatar')!;

    expect(avatar.classList).toContain('avatar--small');
    expect(avatar.classList).not.toContain('p-avatar-lg');
  });
});
