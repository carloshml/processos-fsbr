import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, Observable, of } from "rxjs";


@Injectable()
export class LocalidadesService {

    constructor(public http: HttpClient) {
    }

    buscarLocalidate(uf: string) {
        return lastValueFrom(
            this.http
                .get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)
                .pipe(
                    catchError(this.handleErrorPesquisa<any>('buscarLocalidate', {}))
                )
        );

    }

    private handleErrorPesquisa<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T);
        };
    }
}