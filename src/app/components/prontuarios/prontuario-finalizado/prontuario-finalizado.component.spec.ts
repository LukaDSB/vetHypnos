import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioFinalizadoComponent } from './prontuario-finalizado.component';

describe('ProntuarioFinalizadoComponent', () => {
  let component: ProntuarioFinalizadoComponent;
  let fixture: ComponentFixture<ProntuarioFinalizadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProntuarioFinalizadoComponent]
    });
    fixture = TestBed.createComponent(ProntuarioFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
