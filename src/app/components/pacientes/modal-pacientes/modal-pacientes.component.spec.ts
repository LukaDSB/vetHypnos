import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPacientesComponent } from './modal-pacientes.component';

describe('ModalPacientesComponent', () => {
  let component: ModalPacientesComponent;
  let fixture: ComponentFixture<ModalPacientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPacientesComponent]
    });
    fixture = TestBed.createComponent(ModalPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
