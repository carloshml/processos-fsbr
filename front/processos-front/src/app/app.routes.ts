import { Routes } from '@angular/router';
import { CadastroProcessoComponent } from './components/cadastro-processo/cadastro-processo.component';
import { ListarProcessosComponent } from './components/listar-processos/listar-processos.component';

export const routes: Routes = [


    { path: '', component: ListarProcessosComponent },
    { path: 'cadastrar', component: CadastroProcessoComponent }
];
