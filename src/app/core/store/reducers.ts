import { ActionReducerMap } from '@ngrx/store';
import { SuperHeroListState } from '../models/super-hero-list-state';
import * as superHerpListFilterReducer from './super-hero-list/super-hero-list.reducer';

export interface IonicCourseState {
    superHeroList: SuperHeroListState;
}

export const reducers: ActionReducerMap<IonicCourseState> = {
    superHeroList: superHerpListFilterReducer.reducer
};
