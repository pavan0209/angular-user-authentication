import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiEndpoints } from '../../../shared/constants/api-endpoints';

import { LoginRequest } from '../models/login-request';
import { ApiService } from '../../../core/services/api';
import { RegisterRequest } from '../models/register-request';
import { LoginResponse } from '../models/login-response';
import { UserResponse } from '../models/user-response';
import { ApiResponse } from '../../../core/models/api-response';
import { UpdateUserRequest } from '../models/update-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiService = inject(ApiService);

  login(request: LoginRequest) {
    return this.apiService.post<ApiResponse<LoginResponse>>(ApiEndpoints.AUTH.LOGIN, request);
  }

  register(request: RegisterRequest) {
    return this.apiService.post<ApiResponse<UserResponse>>(ApiEndpoints.AUTH.REGISTER, request);
  }

  updateUser(id: number, request: UpdateUserRequest) {
    return this.apiService.put<ApiResponse<UserResponse>>(
      ApiEndpoints.AUTH.UPDATE_USER(id),
      request,
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');

    localStorage.removeItem('user');
  }
}
