import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubUser } from '../../models';
import { AvatarUrlPipe } from '../../pipes/avatar-url.pipe';

import { FollowersAvatarComponent } from './followers-avatar.component';

describe('FollowersAvatarComponent', () => {
	let component: FollowersAvatarComponent;
	let fixture: ComponentFixture<FollowersAvatarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FollowersAvatarComponent, AvatarUrlPipe]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FollowersAvatarComponent);
		component = fixture.componentInstance;
	});

	it('deve calcular a quantidade restante de seguidores', () => {
		component.followers = [
			{
				id: 'USER_1_ID',
				avatarUrl: 'USER_1_AVATAR'
			},
			{
				id: 'USER_2_ID',
				avatarUrl: 'USER_2_AVATAR'
			}
		] as Partial<GithubUser>[] as GithubUser[];

		component.totalFollowers = 5;

		fixture.detectChanges();

		expect(component.remaningFollowers).toBe(3);
	});
});
