import { Routes } from '@angular/router';
import { CadastroProcessoComponent } from './components/cadastro-processo/cadastro-processo.component';
import { ListarProcessosComponent } from './components/listar-processos/listar-processos.component';
import { LerProcessoComponent } from './components/ler-processo/ler-processo.component';

export const routes: Routes = [


    { path: '', component: ListarProcessosComponent },
    { path: 'cadastrar-processo', component: CadastroProcessoComponent },
    { path: 'ler-processo/:id', component: LerProcessoComponent },
    
];
