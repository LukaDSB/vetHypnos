import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdkModalComponent } from './hdk-modal.component';

describe('HdkModalComponent', () => {
  let component: HdkModalComponent;
  let fixture: ComponentFixture<HdkModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HdkModalComponent]
    });
    fixture = TestBed.createComponent(HdkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
