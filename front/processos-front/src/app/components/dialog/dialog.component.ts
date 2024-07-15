import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  titulo = 'Salvar Processo?';
  descricao = '';
  txtBtnFechar = 'Fechar';
  txtBtnOk = 'Salvar';

  readonly dialogRef = inject(MatDialogRef<DialogComponent>);


  fechar(situcao: boolean): void {
    this.dialogRef.close(situcao);
  }
}
