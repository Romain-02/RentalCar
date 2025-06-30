import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInfoFormComponent } from './driver-info-form.component';

describe('DriverInfoFormComponent', () => {
  let component: DriverInfoFormComponent;
  let fixture: ComponentFixture<DriverInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
