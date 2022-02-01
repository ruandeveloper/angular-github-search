import { GithubUser } from './../../models/github-response.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-followers-avatar',
	templateUrl: './followers-avatar.component.html',
	styleUrls: ['./followers-avatar.component.scss']
})
export class FollowersAvatarComponent implements OnInit {
	@Input() followers?: GithubUser[];
	@Input() totalFollowers = 0;

	public remaningFollowers = 0;

	ngOnInit(): void {
		this.getRemaingFollowers();
	}

	getRemaingFollowers(): void {
		this.remaningFollowers =
			this.totalFollowers - (this.followers?.length ?? 0);
	}

	trackBy(index: number, user: GithubUser): string {
		return user.url;
	}
}
