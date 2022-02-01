import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { first } from 'rxjs/operators';

describe(`${SearchInputComponent.name}`, () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SearchInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
  });

  it('deve emitir evento com o termo digitado', (done) => {
    fixture.detectChanges();

    component.searchTermChanged.pipe(first()).subscribe((term) => {
      expect(term).toContain('term');
      done();
    });

    component.searchControl.setValue('term');
  });
});
