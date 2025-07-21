import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPurchaseComponent } from './empty-purchase.component';

describe('EmptyPurchaseComponent', () => {
  let component: EmptyPurchaseComponent;
  let fixture: ComponentFixture<EmptyPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmptyPurchaseComponent]
    });
    fixture = TestBed.createComponent(EmptyPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
