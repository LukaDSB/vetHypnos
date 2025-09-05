import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErroComponent } from './modal-erro.component';

describe('ModalErroComponent', () => {
  let component: ModalErroComponent;
  let fixture: ComponentFixture<ModalErroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalErroComponent]
    });
    fixture = TestBed.createComponent(ModalErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
