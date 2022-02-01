import { TestBed } from '@angular/core/testing';

import { FavoriteItemService } from './favorite-item.service';

describe('FavoriteItemService', () => {
	let service: FavoriteItemService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FavoriteItemService);
	});

	it('deve obter os itens favoritos', () => {
		spyOn(localStorage, 'getItem').and.returnValue(
			'[{"id":"USER_ID","type":"user"}, {"id":"REPOSITORY_ID","type":"repository"}]'
		);

		const items = service.getFavorites();

		expect(items?.length).toEqual(2);
		expect(items?.[0].id).toEqual('USER_ID');
		expect(items?.[1].id).toEqual('REPOSITORY_ID');
	});

	it('deve adicionar item ao array de items favoritos no local storage', () => {
		spyOn(localStorage, 'getItem').and.returnValue(
			'[{"id":"USER_ID","type":"user"}, {"id":"REPOSITORY_ID","type":"repository"}]'
		);
		spyOn(localStorage, 'setItem');

		service.addToFavorite({ type: 'user', id: 'USER_ID_2' });

		expect(localStorage.setItem).toHaveBeenCalledWith(
			'favorite-items',
			'[{"id":"USER_ID","type":"user"},{"id":"REPOSITORY_ID","type":"repository"},{"type":"user","id":"USER_ID_2"}]'
		);
	});

	it('deve remover o item dos favoritos', () => {
		spyOn(localStorage, 'getItem').and.returnValue(
			'[{"id":"USER_ID","type":"user"}, {"id":"REPOSITORY_ID","type":"repository"}]'
		);
		spyOn(localStorage, 'setItem');

		service.removeFromFavorite({ type: 'user', id: 'USER_ID' });

		expect(localStorage.setItem).toHaveBeenCalledWith(
			'favorite-items',
			'[{"id":"REPOSITORY_ID","type":"repository"}]'
		);
	});
});
