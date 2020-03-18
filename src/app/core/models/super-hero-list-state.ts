import { BaseState } from './base-state';
import { Hero } from './hero';

export interface SuperHeroListState extends BaseState {
    heroes: Hero[];
}
