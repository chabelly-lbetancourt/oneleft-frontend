import { computed, signal } from '@angular/core';

/** Session test double: simulates sessions without Keycloak. */
export class FakeSession {
  readonly authenticated = signal(false);
  readonly name = signal('');
  readonly userId = signal<string | null>(null);
  readonly isAuthenticated = computed(() => this.authenticated());
  readonly userName = computed(() => this.name());
  readonly initials = computed(() => this.name().slice(0, 2).toUpperCase());
  readonly login = vi.fn();
  readonly register = vi.fn();
  readonly logout = vi.fn();

  signIn(name: string, id = 'me'): void {
    this.name.set(name);
    this.userId.set(id);
    this.authenticated.set(true);
  }
}
