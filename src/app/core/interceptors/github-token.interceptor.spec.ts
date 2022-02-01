import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
	HttpClientTestingModule,
	HttpTestingController
} from '@angular/common/http/testing';
import { GithubTokenInterceptor } from './github-token.interceptor';
import { environment } from 'src/environments';

describe(`${GithubTokenInterceptor.name}`, () => {
	let httpTestingController: HttpTestingController;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				GithubTokenInterceptor,
				HttpClient,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: GithubTokenInterceptor,
					multi: true
				}
			]
		});

		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => httpTestingController.verify());

	it('deve setar a Authorization header na requisição', (done) => {
		httpClient.get('/fake-request').subscribe((data) => {
			expect(data).toBeTruthy();
			done();
		});

		const req = httpTestingController.expectOne(`/fake-request`);

		expect(req.request.method).toBe('GET');
		expect(req.request.headers.get('Authorization')).toBe(
			`Bearer ${environment.githubToken}`
		);

		req.flush([]);
	});
});
