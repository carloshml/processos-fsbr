import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListarProcessosComponent } from './components/listar-processos/listar-processos.component';

export const routes: Routes = [


    { path: '', component: ListarProcessosComponent },
    { path: 'cadastrar', component: HomeComponent }
];
