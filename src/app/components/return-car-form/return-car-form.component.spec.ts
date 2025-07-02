import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCarFormComponent } from './return-car-form.component';

describe('ReturnCarFormComponent', () => {
  let component: ReturnCarFormComponent;
  let fixture: ComponentFixture<ReturnCarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnCarFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnCarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
