import * as fromActions from './super-hero-list.action';
import { defaultSuperHeroListState } from './super-hero-list.state';
import { SuperHeroListState } from '../../models/super-hero-list-state';

export function reducer(
	state = defaultSuperHeroListState,
	action: fromActions.SuperHeroListActions
): SuperHeroListState {
	switch (action.type) {
		case fromActions.SuperHeroListActionTypes.SetSuperHeroList:
			debugger;
			if (state.heroes.length === 0) {
				// TODO: hacer llamada a back
				return { ...state, heroes: action.payload };
			} else {
				return state;
			}
		default:
			return state;
	}
}
