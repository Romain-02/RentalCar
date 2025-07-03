import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteesPageComponent } from './guarantees-page.component';

describe('GuaranteesPageComponent', () => {
  let component: GuaranteesPageComponent;
  let fixture: ComponentFixture<GuaranteesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuaranteesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuaranteesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
