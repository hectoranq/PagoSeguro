import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDataComponent } from './purchase-data.component';

describe('PurchaseDataComponent', () => {
  let component: PurchaseDataComponent;
  let fixture: ComponentFixture<PurchaseDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PurchaseDataComponent]
    });
    fixture = TestBed.createComponent(PurchaseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
