import { TestBed } from '@angular/core/testing';

import { DeleteItemService } from './delete-item.service';

describe('DeleteItemService', () => {
	let service: DeleteItemService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DeleteItemService);
	});

	it('deve obter os itens removidos', () => {
		spyOn(localStorage, 'getItem').and.returnValue(
			'[{"id":"USER_ID","type":"user"}, {"id":"REPOSITORY_ID","type":"repository"}]'
		);

		const items = service.getDeletedItems();

		expect(items?.length).toEqual(2);
		expect(items?.[0].id).toEqual('USER_ID');
		expect(items?.[1].id).toEqual('REPOSITORY_ID');
	});

	it('deve adicionar item ao array de items removidos no local storage', () => {
		spyOn(localStorage, 'getItem').and.returnValue(
			'[{"id":"USER_ID","type":"user"}, {"id":"REPOSITORY_ID","type":"repository"}]'
		);
		spyOn(localStorage, 'setItem');

		service.deleteItem('user', 'USER_ID_2');

		expect(localStorage.setItem).toHaveBeenCalledWith(
			'deleted-items',
			'[{"id":"USER_ID","type":"user"},{"id":"REPOSITORY_ID","type":"repository"},{"type":"user","id":"USER_ID_2"}]'
		);
	});
});
