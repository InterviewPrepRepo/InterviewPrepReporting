import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInviteComponent } from './test-invite.component';

describe('TestInviteComponent', () => {
  let component: TestInviteComponent;
  let fixture: ComponentFixture<TestInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestInviteComponent]
    });
    fixture = TestBed.createComponent(TestInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
