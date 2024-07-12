import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, Observable, of } from "rxjs";
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
                    catchError(this.handleErrorPesquisa<any>('salvarProcessos', {}))
                )
        );

    }

    listarProcessos() {
        return lastValueFrom(
            this.http
                .get<any>(this.api)
                .pipe(
                    catchError(this.handleErrorPesquisa<any>('listarProcessos', {}))
                )
        );
    }


    listarQtdProcessos() {
        return lastValueFrom(
            this.http
                .get<any>(`${this.api}/listarQtdProcessos`)
                .pipe(
                    catchError(this.handleErrorPesquisa<any>('listarQtdProcessos', {}))
                )
        );
    }

    listarProcessosPaginado(inicio: number, quantidade: number) {
        return lastValueFrom(
            this.http
                .get<any>(`${this.api}/listarProcessosPaginado/${inicio}/${quantidade}`)
                .pipe(
                    catchError(this.handleErrorPesquisa<any>('listarProcessosPaginado', {}))
                )
        );
    }

    private handleErrorPesquisa<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T);
        };
    }
}