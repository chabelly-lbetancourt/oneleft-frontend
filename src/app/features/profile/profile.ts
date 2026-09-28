import { httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { environment } from '../../../environments/environment';
import { Session } from '../../core/auth/session';
import { UserProfile } from '../../shared/model/user';

@Component({
  selector: 'app-profile',
  imports: [Avatar, Button, RouterLink, Tag],
  templateUrl: './profile.html',
})
export class Profile {
  protected readonly session = inject(Session);
  protected readonly profile = httpResource<UserProfile>(() => `${environment.apiUrl}/api/v1/users/me`);

  protected roleLabel(role: string): string {
    return role === 'ADMIN' ? 'Administrador' : 'Usuario';
  }
}
