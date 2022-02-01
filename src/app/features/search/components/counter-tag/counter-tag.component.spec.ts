import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterTagComponent } from './counter-tag.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getTextFromElement, queryElementByDataTest } from 'src/app/core/utils';

describe(`${CounterTagComponent.name}`, () => {
	let component: CounterTagComponent;
	let fixture: ComponentFixture<CounterTagComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatTooltipModule, FontAwesomeModule],
			declarations: [CounterTagComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CounterTagComponent);
		component = fixture.componentInstance;
	});

	it('deve exibir a tag de contador', () => {
		const count = 5;
		component.count = count;
		fixture.detectChanges();

		const element = queryElementByDataTest(fixture, 'counter-tag');

		expect(getTextFromElement(element)).toContain(`${count}`);
	});
});
