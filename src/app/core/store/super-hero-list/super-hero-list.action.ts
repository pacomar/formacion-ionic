import { Action } from '@ngrx/store';
import { Hero } from '../../models/hero';

export enum SuperHeroListActionTypes {
    SetSuperHeroList = '[SupeHeroList] Set SetSuperHeroList'
}

export class SetSuperHeroList implements Action {
    readonly type = SuperHeroListActionTypes.SetSuperHeroList;

    constructor(public payload: Hero[]) {}
}

export type SuperHeroListActions =
    | SetSuperHeroList;
