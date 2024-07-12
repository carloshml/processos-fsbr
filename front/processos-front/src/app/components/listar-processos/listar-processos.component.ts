import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProcessoService } from '../../services/processo-service';
import { Processo } from '../../entities/processo';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { Pager, PaginacaoService } from '../pagination/paginacao.service';

@Component({
  selector: 'app-listar-processos',
  standalone: true,
  imports: [MatIconModule, CommonModule, PaginationComponent],
  providers: [ProcessoService],
  templateUrl: './listar-processos.component.html',
  styleUrl: './listar-processos.component.scss'
})
export class ListarProcessosComponent {

  processos: Processo[] = [];

  pager: Pager = new Pager();
  paginacaoServico = new PaginacaoService();
  totalElementos = 0;
  valorMaximoLinhasGrid = 5;

  constructor(public processoService: ProcessoService) {
  }

  async ngOnInit(): Promise<void> {
    this.totalElementos = await this.processoService.listarQtdProcessos();
    this.setPageofClientes(1);
  }

  async setPageofClientes(page: any) {
    console.log('page', page);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginacaoServico.getPager(this.totalElementos, page, this.valorMaximoLinhasGrid);
    const processos = await this.processoService.listarProcessosPaginado((this.pager.currentPage - 1), this.valorMaximoLinhasGrid);
    console.log('processos', processos);
    this.processos = processos;
  }

}
