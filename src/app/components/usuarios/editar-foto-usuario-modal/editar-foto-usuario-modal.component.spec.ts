import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFotoUsuarioModalComponent } from './editar-foto-usuario-modal.component';

describe('EditarFotoUsuarioModalComponent', () => {
  let component: EditarFotoUsuarioModalComponent;
  let fixture: ComponentFixture<EditarFotoUsuarioModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFotoUsuarioModalComponent]
    });
    fixture = TestBed.createComponent(EditarFotoUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
