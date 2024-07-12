import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProcessoService } from '../../services/processo-service';
import { Processo } from '../../entities/processo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-processos',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  providers: [ProcessoService],
  templateUrl: './listar-processos.component.html',
  styleUrl: './listar-processos.component.scss'
})
export class ListarProcessosComponent {

  processos: Processo[] = [];

  constructor(public processoService: ProcessoService) {
  }

  async ngOnInit(): Promise<void> {
    this.processos = await this.processoService.listarProcessos();
  }

}
