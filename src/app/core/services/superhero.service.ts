import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
// https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SuperheroService {
    constructor(private http: HttpClient) {

    }
    getSuperheroAll(): Observable<any> {
        return this.http.get(environment.superhero_api + 'all.json');
    }

    getSuperheroDetail(id: string): Observable<any> {
        return this.http.get(environment.superhero_api + '/id/' + id + '.json');
    }
}
