import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../Interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'https://localhost:7223/api/auth';
  private readonly tokenKey = 'token';

  constructor(private http: HttpClient) {}

  // =========================
  // 🔐 AUTH API CALLS
  // =========================

  login(data: { email: string; password: string }): Observable<AuthResponse> {    // receives response from backend as observable authresponse
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // =========================
  // 💾 TOKEN MANAGEMENT
  // =========================

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // =========================
  // 🧠 JWT UTILITIES
  // =========================

  private getTokenPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
     const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }     

  getRole(): string | null {
    const payload = this.getTokenPayload();
   // return payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
   return payload?.role || null;
  }

  getEmail(): string | null {
    const payload = this.getTokenPayload();
   // return payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
   return payload?.email || null;
  }

  isTokenExpired(): boolean {
    const payload = this.getTokenPayload();
    if (!payload?.exp) return true;

    const expiry = payload.exp * 1000; // convert to milliseconds
    return Date.now() > expiry;
  }   

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();     // token exists and that it is not expired.
  }       
  
}
