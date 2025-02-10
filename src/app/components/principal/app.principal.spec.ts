import { TestBed } from '@angular/core/testing';
import { AppPrincipal } from './app.principal';

describe('AppPrincipal', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPrincipal],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppPrincipal);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'projetoTeste' title`, () => {
    const fixture = TestBed.createComponent(AppPrincipal);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('projetoTeste');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppPrincipal);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, projetoTeste');
  });
});
