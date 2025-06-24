import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimaisComponent } from './animais.component';

describe('AnimaisComponent', () => {
  let component: AnimaisComponent;
  let fixture: ComponentFixture<AnimaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimaisComponent]
    });
    fixture = TestBed.createComponent(AnimaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
