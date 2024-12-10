import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCarteiraComponent } from './cadastro-carteira.component';

describe('CadastroCarteiraComponent', () => {
  let component: CadastroCarteiraComponent;
  let fixture: ComponentFixture<CadastroCarteiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCarteiraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroCarteiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
