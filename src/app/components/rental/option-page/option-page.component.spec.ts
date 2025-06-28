import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionPageComponent } from './option-page.component';

describe('OptionPageComponent', () => {
  let component: OptionPageComponent;
  let fixture: ComponentFixture<OptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
