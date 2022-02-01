import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTextFromElement, queryElementByDataTest } from 'src/app/core/utils';
import { GithubRepository } from '../../models';

import { UserRepositoriesComponent } from './user-repositories.component';

describe('UserRepositoriesComponent', () => {
	let component: UserRepositoriesComponent;
	let fixture: ComponentFixture<UserRepositoriesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserRepositoriesComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserRepositoriesComponent);
		component = fixture.componentInstance;
	});

	it('deve exibir os repositorios do usuario', () => {
		component.repositories = [
			{
				id: 'REPOSITORY_ID',
				name: 'REPOSITORY_NAME',
				description: 'REPOSITORY_DESCRIPTION',
				url: 'REPOSITORY_URL'
			}
		] as Partial<GithubRepository>[] as GithubRepository[];

		fixture.detectChanges();

		const element = queryElementByDataTest(fixture, 'user-repository-name');
		expect(getTextFromElement(element)).toContain('REPOSITORY_NAME');
	});
});
