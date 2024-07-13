import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LerProcessoComponent } from './ler-processo.component';

describe('LerProcessoComponent', () => {
  let component: LerProcessoComponent;
  let fixture: ComponentFixture<LerProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LerProcessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LerProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
