import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProcessoComponent } from './cadastro-processo.component';

describe('CadastroProcessoComponent', () => {
  let component: CadastroProcessoComponent;
  let fixture: ComponentFixture<CadastroProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroProcessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
