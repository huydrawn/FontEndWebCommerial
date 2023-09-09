import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductSellComponent } from './all-product-sell.component';

describe('AllProductSellComponent', () => {
  let component: AllProductSellComponent;
  let fixture: ComponentFixture<AllProductSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProductSellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
