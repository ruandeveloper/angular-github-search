import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments';

@Injectable()
export class GithubTokenInterceptor implements HttpInterceptor {
	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${environment.githubToken}`
			}
		});

		return next.handle(request);
	}
}
