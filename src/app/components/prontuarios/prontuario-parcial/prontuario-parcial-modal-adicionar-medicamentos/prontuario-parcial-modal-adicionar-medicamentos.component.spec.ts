import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioParcialModalAdicionarMedicamentosComponent } from './prontuario-parcial-modal-adicionar-medicamentos.component';

describe('ProntuarioParcialModalAdicionarMedicamentosComponent', () => {
  let component: ProntuarioParcialModalAdicionarMedicamentosComponent;
  let fixture: ComponentFixture<ProntuarioParcialModalAdicionarMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProntuarioParcialModalAdicionarMedicamentosComponent]
    });
    fixture = TestBed.createComponent(ProntuarioParcialModalAdicionarMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
