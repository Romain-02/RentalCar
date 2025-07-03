import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRentalsComponent } from './agent-rentals.component';

describe('AgentRentalsComponent', () => {
  let component: AgentRentalsComponent;
  let fixture: ComponentFixture<AgentRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentRentalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
