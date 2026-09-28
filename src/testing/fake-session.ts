import { computed, signal } from '@angular/core';

/** Doble de prueba de Session: permite simular sesiones sin Keycloak. */
export class FakeSession {
  readonly authenticated = signal(false);
  readonly name = signal('');
  readonly isAuthenticated = computed(() => this.authenticated());
  readonly userName = computed(() => this.name());
  readonly initials = computed(() => this.name().slice(0, 2).toUpperCase());
  readonly login = vi.fn();
  readonly register = vi.fn();
  readonly logout = vi.fn();

  signIn(name: string): void {
    this.name.set(name);
    this.authenticated.set(true);
  }
}
