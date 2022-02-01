import { TestBed } from '@angular/core/testing';
import {
	ApolloTestingModule,
	ApolloTestingController
} from 'apollo-angular/testing';
import { first } from 'rxjs/operators';
import { GithubRepository, GithubSearch, GithubUser } from '../models';
import { GithubSearchService, QUERY_SEARCH } from './github-search.service';

describe(`${GithubSearchService.name}`, () => {
	let service: GithubSearchService;
	let controller: ApolloTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApolloTestingModule]
		});
		service = TestBed.inject(GithubSearchService);
		controller = TestBed.inject(ApolloTestingController);
	});

	afterEach(() => {
		controller.verify();
	});

	it('deve buscar por repositorio', (done) => {
		service
			.searchByRepository('SEARCH_TERM')
			.pipe(first())
			.subscribe((data) => {
				expect(data.search.nodes[0].id).toEqual('REPOSITORY_ID');
				done();
			});

		const op = controller.expectOne(QUERY_SEARCH);

		expect(op.operation.variables.query).toEqual('SEARCH_TERM');

		op.flush({
			data: {
				search: {
					nodes: [
						{
							id: 'REPOSITORY_ID'
						}
					],
					repositoryCount: 1,
					userCount: 0
				} as Partial<GithubSearch<GithubRepository>>
			}
		});
	});

	it('deve buscar por usuario', (done) => {
		service
			.searchByUser('SEARCH_TERM')
			.pipe(first())
			.subscribe((data) => {
				expect(data.search.nodes[0].id).toEqual('USER_ID');
				done();
			});

		const op = controller.expectOne(QUERY_SEARCH);

		expect(op.operation.variables.query).toEqual('SEARCH_TERM');

		op.flush({
			data: {
				search: {
					nodes: [
						{
							id: 'USER_ID'
						}
					],
					repositoryCount: 0,
					userCount: 1
				} as Partial<GithubSearch<GithubUser>>
			}
		});
	});

	it('deve buscar por repositorio e usuario', (done) => {
		service
			.searchByUserAndRepository({
				term: 'SEARCH_TERM'
			})
			.pipe(first())
			.subscribe((data) => {
				expect(data.items.length).toBe(2);
				done();
			});

		const [repositoryRequest, userRequest] = controller.match(QUERY_SEARCH);

		expect(repositoryRequest.operation.variables.type).toEqual(
			'REPOSITORY'
		);
		expect(userRequest.operation.variables.type).toEqual('USER');

		repositoryRequest.flush({
			data: {
				search: {
					nodes: [
						{
							id: 'REPOSITORY_ID'
						}
					],
					repositoryCount: 1,
					userCount: 0
				} as Partial<GithubSearch<GithubRepository>>
			}
		});

		userRequest.flush({
			data: {
				search: {
					nodes: [
						{
							__typename: 'User',
							id: 'USER_ID'
						}
					],
					repositoryCount: 0,
					userCount: 1
				} as Partial<GithubSearch<GithubUser>>
			}
		});
	});
});
