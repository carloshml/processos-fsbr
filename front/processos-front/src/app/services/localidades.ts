import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, throwError } from "rxjs";


@Injectable()
export class LocalidadesService {

    constructor(public http: HttpClient) {
    }

    buscarLocalidate(uf: string) {
        return lastValueFrom(
            this.http
                .get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );

    }

    private handleErrorRequisicao(e: any) {
        return e.error;
    }
}