import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesTutorComponent } from './detalhes-tutor.component';

describe('DetalhesTutorComponent', () => {
  let component: DetalhesTutorComponent;
  let fixture: ComponentFixture<DetalhesTutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesTutorComponent]
    });
    fixture = TestBed.createComponent(DetalhesTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
