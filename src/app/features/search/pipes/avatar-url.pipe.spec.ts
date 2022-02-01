import { AvatarUrlPipe } from './avatar-url.pipe';

describe(`${AvatarUrlPipe.name}`, () => {
  it('deve retornar url do avatar com a propriedade "s" setando o tamanho da imagem', () => {
    const pipe = new AvatarUrlPipe();
    const url = pipe.transform(
      `https://avatars.githubusercontent.com/u/29839488?s=10&u=d5a96a3bef9bf46215add1b137672ced78e225ae&v=4`
    );
    expect(url).toEqual(
      `https://avatars.githubusercontent.com/u/29839488?10&u=d5a96a3bef9bf46215add1b137672ced78e225ae&v=4&s=620`
    );
  });
});
