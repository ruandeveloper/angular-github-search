import { Component, Input } from '@angular/core';
import { GithubRepository } from '../../models';

@Component({
	selector: 'app-user-repositories',
	templateUrl: './user-repositories.component.html',
	styleUrls: ['./user-repositories.component.scss']
})
export class UserRepositoriesComponent {
	@Input() repositories?: GithubRepository[];

	trackBy(index: number, repository: GithubRepository): string {
		return repository.id;
	}
}
