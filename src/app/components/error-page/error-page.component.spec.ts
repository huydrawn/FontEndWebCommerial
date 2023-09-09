import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageNotVertificationComponent } from './error-page.component';

describe('ErrorPageNotVertificationComponent', () => {
  let component: ErrorPageNotVertificationComponent;
  let fixture: ComponentFixture<ErrorPageNotVertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPageNotVertificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorPageNotVertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
