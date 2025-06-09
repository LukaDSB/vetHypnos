import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoresModalComponent } from './tutores-modal.component';

describe('TutoresModalComponent', () => {
  let component: TutoresModalComponent;
  let fixture: ComponentFixture<TutoresModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutoresModalComponent]
    });
    fixture = TestBed.createComponent(TutoresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
