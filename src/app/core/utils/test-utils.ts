import { DebugElement, Predicate } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function dataTestSelector(dataTestId: string): Predicate<DebugElement> {
	return By.css(`[data-test="${dataTestId}"]`);
}

export function queryAllElementsByDataTest<T>(
	fixture: ComponentFixture<T>,
	dataTestId: string
): DebugElement[] {
	return fixture.debugElement.queryAll(dataTestSelector(dataTestId));
}

export function queryElementByDataTest<T>(
	fixture: ComponentFixture<T>,
	dataTestId: string
): DebugElement {
	return fixture.debugElement.query(dataTestSelector(dataTestId));
}

export function getTextFromElement(debugElement: DebugElement): string {
	return debugElement.nativeElement.innerText;
}
