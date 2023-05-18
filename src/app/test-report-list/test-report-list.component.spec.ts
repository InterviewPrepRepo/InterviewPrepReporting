import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportListComponent } from './test-report-list.component';

describe('TestReportListComponent', () => {
  let component: TestReportListComponent;
  let fixture: ComponentFixture<TestReportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportListComponent]
    });
    fixture = TestBed.createComponent(TestReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
