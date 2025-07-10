import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarMedicamentosComponent } from './selecionar-medicamentos.component';

describe('SelecionarMedicamentosComponent', () => {
  let component: SelecionarMedicamentosComponent;
  let fixture: ComponentFixture<SelecionarMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelecionarMedicamentosComponent]
    });
    fixture = TestBed.createComponent(SelecionarMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
