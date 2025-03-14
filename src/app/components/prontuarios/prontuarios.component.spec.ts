import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuariosComponent } from './prontuarios.component';

describe('ProntuariosComponent', () => {
  let component: ProntuariosComponent;
  let fixture: ComponentFixture<ProntuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProntuariosComponent]
    });
    fixture = TestBed.createComponent(ProntuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
