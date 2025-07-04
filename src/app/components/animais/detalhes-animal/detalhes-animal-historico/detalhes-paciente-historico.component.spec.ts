import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPacienteHistoricoComponent } from './detalhes-paciente-historico.component';

describe('DetalhesPacienteHistoricoComponent', () => {
  let component: DetalhesPacienteHistoricoComponent;
  let fixture: ComponentFixture<DetalhesPacienteHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesPacienteHistoricoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesPacienteHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
