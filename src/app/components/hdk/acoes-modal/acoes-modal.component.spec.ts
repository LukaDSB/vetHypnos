import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoesModalComponent } from './acoes-modal.component';

describe('AcoesModalComponent', () => {
  let component: AcoesModalComponent;
  let fixture: ComponentFixture<AcoesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcoesModalComponent]
    });
    fixture = TestBed.createComponent(AcoesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
