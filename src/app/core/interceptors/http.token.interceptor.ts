import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {TokenService} from '@core/services/token.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken();

    // const isLoggedIn = token && this.authService.isLoggedIn;
    // const isApiUrl = request.url.startsWith(environment.apiSettings.hostname);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `OAuth ${token}`,
          Accept: 'application/vnd.twitchtv.v5+json',
          'Client-ID': 'iorij84zsvsyowclla1vnco2mqaa49'
        }
      });
    }

    return next.handle(request);
  }
}
