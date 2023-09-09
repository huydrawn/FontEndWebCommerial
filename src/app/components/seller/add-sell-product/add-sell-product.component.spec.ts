import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSellProductComponent } from './add-sell-product.component';

describe('AddSellProductComponent', () => {
  let component: AddSellProductComponent;
  let fixture: ComponentFixture<AddSellProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSellProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSellProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
