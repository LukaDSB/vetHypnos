import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTesteComponent } from './page-teste.component';

describe('PageTesteComponent', () => {
  let component: PageTesteComponent;
  let fixture: ComponentFixture<PageTesteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageTesteComponent]
    });
    fixture = TestBed.createComponent(PageTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
