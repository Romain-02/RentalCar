import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNgPrimeComponent } from './test-ng-prime.component';

describe('TestNgPrimeComponent', () => {
  let component: TestNgPrimeComponent;
  let fixture: ComponentFixture<TestNgPrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestNgPrimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestNgPrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
