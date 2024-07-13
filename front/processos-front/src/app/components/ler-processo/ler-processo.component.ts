import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProcessoService } from '../../services/processo-service';
import { Processo } from '../../entities/processo';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { DialogComponent } from '../dialog/dialog.component';
import { base64ToFile, createURL } from '../../comuns/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ler-processo',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatProgressBarModule, DialogComponent],
  providers: [ProcessoService],
  templateUrl: './ler-processo.component.html',
  styleUrl: './ler-processo.component.scss'
})
export class LerProcessoComponent implements OnInit {

  processoId!: any;
  processo!: Processo;
  form: FormGroup;
  processoPdfUrl = '';
  urlSafe: any;
  @ViewChild('pdfView') pdfView!: ElementRef;

  constructor(formBuilder: FormBuilder, private route: ActivatedRoute, private _snackBar: MatSnackBar,
    private processoService: ProcessoService, public sanitizer: DomSanitizer) {
    this.form = formBuilder.group({
      uf: new FormControl('', Validators.required),
      municipio: new FormControl('', Validators.required),
      npu: new FormControl('', Validators.required),
      documentoNome: new FormControl('', Validators.required)
    });
  }

  async ngOnInit(): Promise<void> {
    console.log(' ngOnInit ');
    this.processoId = this.route.snapshot.paramMap.get('id');
    try {
      this.processo = await this.processoService.getProcessoById(this.processoId);
      console.log('this.processoId', this.processoId);
      console.log('this.processo', this.processo);
      this.form.get('uf')?.setValue(this.processo.uf);
      this.form.get('municipio')?.setValue(this.processo.municipio);
      this.form.get('npu')?.setValue(this.processo.npu);
      this.form.disable();
      this.processoPdfUrl = createURL(this.processo.documento);
      this.pdfView.nativeElement.click();
    } catch (error) {
      this._snackBar.open(JSON.stringify(error));
    }
  }

  seePDF() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.processoPdfUrl);
  }

  downloadPdf() {
    base64ToFile(this.processo.documento, this.processo.documentoNome);
  }

}
