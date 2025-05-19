import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProntuarioComponent } from './page-prontuario.component';

describe('PageProntuarioComponent', () => {
  let component: PageProntuarioComponent;
  let fixture: ComponentFixture<PageProntuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageProntuarioComponent]
    });
    fixture = TestBed.createComponent(PageProntuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
