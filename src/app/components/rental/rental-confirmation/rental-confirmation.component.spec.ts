import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalConfirmationComponent } from './rental-confirmation.component';

describe('RentalConfirmationComponent', () => {
  let component: RentalConfirmationComponent;
  let fixture: ComponentFixture<RentalConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
