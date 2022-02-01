import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  getTextFromElement,
  queryAllElementsByDataTest,
} from 'src/app/core/utils';

import { LanguageTagComponent } from './languages.component';

describe(`${LanguageTagComponent.name}`, () => {
  let component: LanguageTagComponent;
  let fixture: ComponentFixture<LanguageTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageTagComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTagComponent);
    component = fixture.componentInstance;
  });

  it('deve exibir as linguagens', () => {
    component.languages = [
      {
        name: 'language-1',
        color: '',
      },
      {
        name: 'language-2',
        color: '',
      },
    ];

    fixture.detectChanges();
    const elements = queryAllElementsByDataTest(fixture, 'language-tag');

    expect(elements.length).toEqual(2);
    expect(getTextFromElement(elements[0])).toContain('language-1');
  });
});
