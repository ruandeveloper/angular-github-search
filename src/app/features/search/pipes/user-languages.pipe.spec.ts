import { GithubRepository } from '../models';
import { UserLanguagesPipe } from './user-languages.pipe';

describe(`${UserLanguagesPipe.name}`, () => {
	it('deve retornar as linguagens do usuario baseado no seu repositorio', () => {
		const repositories = [
			{
				languages: {
					nodes: [
						{
							name: 'language-1',
							color: ''
						},
						{
							name: 'language-2',
							color: ''
						}
					]
				}
			},
			{
				languages: {
					nodes: [
						{
							name: 'language-1',
							color: ''
						},
						{
							name: 'language-3',
							color: ''
						}
					]
				}
			}
		] as GithubRepository[];

		const pipe = new UserLanguagesPipe();
		const languages = pipe.transform(repositories);

		expect(languages?.length).toEqual(3);
		expect(languages?.[0]?.name).toEqual('language-1');
		expect(languages?.[2]?.name).toEqual('language-3');
	});
});
