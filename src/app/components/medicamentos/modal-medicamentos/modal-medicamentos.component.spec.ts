import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMedicamentosComponent } from './modal-medicamentos.component';

describe('ModalMedicamentosComponent', () => {
  let component: ModalMedicamentosComponent;
  let fixture: ComponentFixture<ModalMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMedicamentosComponent]
    });
    fixture = TestBed.createComponent(ModalMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
