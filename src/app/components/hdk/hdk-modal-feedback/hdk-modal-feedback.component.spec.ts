import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdkModalFeedbackComponent } from './hdk-modal-feedback.component';

describe('HdkModalFeedbackComponent', () => {
  let component: HdkModalFeedbackComponent;
  let fixture: ComponentFixture<HdkModalFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HdkModalFeedbackComponent]
    });
    fixture = TestBed.createComponent(HdkModalFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
