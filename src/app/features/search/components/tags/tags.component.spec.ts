import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsComponent } from './tags.component';

describe('TagsComponent', () => {
	let component: TagsComponent;
	let fixture: ComponentFixture<TagsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TagsComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TagsComponent);
		component = fixture.componentInstance;
	});

	it('deve adicionar nova tag', () => {
		fixture.detectChanges();

		component.addNewTag();

		expect(component.tags[0]).toEqual('');
	});

	it('deve alterar a tag', () => {
		component.tags = ['a', 'b', 'c'];
		fixture.detectChanges();

		component.changeTag(0, {
			target: {
				value: 'a-change'
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		expect(component.tags[0]).toEqual('a-change');
	});

	it('deve remover tag', () => {
		component.tags = ['a', 'b', 'c'];
		fixture.detectChanges();

		component.removeTag(1);

		expect(component.tags[1]).toEqual('c');
	});
});
