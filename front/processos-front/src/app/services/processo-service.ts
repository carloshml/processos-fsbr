import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, Observable, of, throwError } from "rxjs";
import { OBJPROCESSO } from "../components/cadastro-processo/cadastro-processo.component";


@Injectable()
export class ProcessoService {

    api = `http://localhost:8080/processos`;

    constructor(public http: HttpClient) {
    }

    salvarProcessos(processo: OBJPROCESSO) {
        return lastValueFrom(
            this.http
                .post<any>(this.api, processo)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );

    }

    listarProcessos() {
        return lastValueFrom(
            this.http
                .get<any>(this.api)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }


    listarQtdProcessos() {
        return lastValueFrom(
            this.http
                .get<any>(`${this.api}/listarQtdProcessos`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    listarProcessosPaginado(inicio: number, quantidade: number) {
        return lastValueFrom(
            this.http
                .get<any>(`${this.api}/listarProcessosPaginado/${inicio}/${quantidade}`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    private handleErrorRequisicao(e: any) {
        return e.error;
    }
}

