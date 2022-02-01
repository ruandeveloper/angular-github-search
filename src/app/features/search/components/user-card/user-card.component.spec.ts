import { SearchModule } from './../../search.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { getTextFromElement, queryElementByDataTest } from 'src/app/core/utils';
import { GithubUser } from '../../models';

describe(`${UserCardComponent.name}`, () => {
	let component: UserCardComponent;
	let fixture: ComponentFixture<UserCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SearchModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserCardComponent);
		component = fixture.componentInstance;
	});

	it('deve exibir o nome do usuario', () => {
		const userName = 'user_name';
		component.user = {
			name: userName
		} as unknown as GithubUser;

		fixture.detectChanges();
		const element = queryElementByDataTest(fixture, 'user-card-name');

		expect(getTextFromElement(element)).toContain(userName);
	});
});
