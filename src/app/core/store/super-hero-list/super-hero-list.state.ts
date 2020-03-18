import { createSelector } from '@ngrx/store';
import { SuperHeroListState } from '../../models/super-hero-list-state';
import { Hero } from '../../models/hero';

export const defaultSuperHeroListState: SuperHeroListState = {
    heroes: [],
    loading: false,
    error: ''
};

export const layout = ((state): SuperHeroListState => state.superHeroListState);

export const getSuperHeroList = createSelector(layout, (state): Hero[] => state ? state.heroes : []);
