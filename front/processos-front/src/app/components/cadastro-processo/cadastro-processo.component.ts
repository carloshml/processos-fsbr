import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocalidadesService } from '../../services/localidades';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { readFileAsBase64 } from '../../comuns/util';
import { ProcessoService } from '../../services/processo-service';

interface LOCALIDADE {
  value: any;
  descricao: string;
}

export class OBJPROCESSO {
  uf!: string;
  municipio!: string;
  documento!: string;
  documentoNome!: string;
  npu!: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatProgressBarModule, DialogComponent],
  providers: [LocalidadesService, ProcessoService],
  templateUrl: './cadastro-processo.component.html',
  styleUrl: './cadastro-processo.component.scss'
})
export class CadastroProcessoComponent {


  readonly dialog = inject(MatDialog);

  form: FormGroup;
  ufs = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
  ];

  municipios: LOCALIDADE[] = [];
  procurando?: boolean;
  objSave: OBJPROCESSO = new OBJPROCESSO();

  constructor(formBuilder: FormBuilder, private _snackBar: MatSnackBar,
    private localidadesService: LocalidadesService, private processoService: ProcessoService,
  ) {
    this.form = formBuilder.group({
      uf: new FormControl('', Validators.required),
      municipio: new FormControl('', Validators.required),
      npu: new FormControl('', Validators.required),
      documentoNome: new FormControl('', Validators.required)
    });
  }

  limparCampo(form: FormGroup, value: string) {
    form.get(value)?.setValue('');
  }

  async buscarMunicios(uf: any) {
    this.municipios = [];
    this.procurando = true;
    const retorno = await this.localidadesService.buscarLocalidate(uf.value);
    this.municipios = retorno.map((loc: any) => {
      return {
        value: loc,
        descricao: loc.municipio.nome,
      }
    });
    this.procurando = false;
  }

  salvar() {
    this.objSave = this.criarObjSave(this.objSave);
    const validacao = this.validateForm(this.form);
    if (validacao) {
      this._snackBar.open(validacao);
      return;
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '200px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(async permitido => {
      if (permitido) {

        try {
          const response = await this.processoService.salvarProcessos(this.objSave);
          console.log('Salvar this.objSave', this.objSave);
          console.log('Salvar response', response);
          this._snackBar.open('parabéns Processo Salvo');
          this.form.reset();
        } catch (error: any) {
          const errorMessages = error.invalidParams?.map((e: any) => {
            return `Atenção ${e.name}, motivo ${e.reason}`
          });
          this._snackBar.open(error.title + '  ' + errorMessages.join(','));
        }
      }
    });
  }

  validateForm(formGroup: FormGroup): string {
    const errorMessages: string[] = [];
    if (formGroup.controls['uf'].errors) {
      errorMessages.push('Entre com a UF');
    }
    if (formGroup.controls['municipio'].errors) {
      errorMessages.push('Entre com o munucípio');
    }
    if (formGroup.controls['npu'].errors) {
      errorMessages.push('Entre com o NPU');
    }
    if (formGroup.controls['documentoNome'].errors) {
      errorMessages.push('Documento ainda não foi selecionado!');
    }
    return errorMessages.join(',');
  }

  criarObjSave(objSave: OBJPROCESSO) {
    objSave.uf = this.form.getRawValue().uf;
    objSave.municipio = this.form.getRawValue().municipio.descricao;
    objSave.npu = this.form.getRawValue().npu;
    return objSave;
  }


  async inputChange(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (!file) {
      return;
    }
    this.objSave.documentoNome = file.name;
    this.form.get('documentoNome')?.setValue(this.objSave.documentoNome);
    this.objSave.documento = await readFileAsBase64(file) as string;
  }

}
