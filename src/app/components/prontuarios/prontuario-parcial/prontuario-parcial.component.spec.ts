import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioParcialComponent } from './prontuario-parcial.component';

describe('ProntuarioParcialComponent', () => {
  let component: ProntuarioParcialComponent;
  let fixture: ComponentFixture<ProntuarioParcialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProntuarioParcialComponent]
    });
    fixture = TestBed.createComponent(ProntuarioParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
