import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTutoresComponent } from './modal-tutores.component';

describe('ModalTutoresComponent', () => {
  let component: ModalTutoresComponent;
  let fixture: ComponentFixture<ModalTutoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTutoresComponent]
    });
    fixture = TestBed.createComponent(ModalTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
