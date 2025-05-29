import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssociarAnimalExistenteComponent } from './modal-associar-animal-existente.component';

describe('ModalAssociarAnimalExistenteComponent', () => {
  let component: ModalAssociarAnimalExistenteComponent;
  let fixture: ComponentFixture<ModalAssociarAnimalExistenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAssociarAnimalExistenteComponent]
    });
    fixture = TestBed.createComponent(ModalAssociarAnimalExistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
