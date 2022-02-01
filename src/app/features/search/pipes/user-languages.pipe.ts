import {
	GithubLanguage,
	GithubRepository
} from './../models/github-response.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'userLanguages'
})
export class UserLanguagesPipe implements PipeTransform {
	private LANGUAGES_LIMIT = 10;

	public transform(
		repositories?: GithubRepository[]
	): GithubLanguage[] | undefined {
		if (!repositories) return;

		const languagesFromRepositories =
			this.getLanguagesFromRepositories(repositories);
		const distinctLanguages = this.distinctLanguages(
			languagesFromRepositories
		);

		return distinctLanguages.slice(0, this.LANGUAGES_LIMIT);
	}

	private getLanguagesFromRepositories(
		repositories: GithubRepository[]
	): GithubLanguage[] {
		const languages: GithubLanguage[] = [];

		for (const currentRepository of repositories) {
			if (!currentRepository.languages?.nodes) continue;

			languages.push(
				...currentRepository.languages.nodes.map((languageAdd) => {
					return {
						name: languageAdd.name,
						color: languageAdd.color ?? ''
					} as GithubLanguage;
				})
			);
		}

		return languages;
	}

	private distinctLanguages(languages: GithubLanguage[]) {
		return languages.filter(
			(language, i, arr) =>
				arr.findIndex(
					(languageFind) => languageFind.name === language.name
				) === i
		);
	}
}
