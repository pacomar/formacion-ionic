import { InjectionToken } from '@angular/core';
import { StoreConfig } from '@ngrx/store/src/store_module';
import * as fromActions from './super-hero-list.action';
import { SuperHeroListState } from '../../models/super-hero-list-state';

export const SUPER_HERO_LIST_FILTER_STORAGE_KEYS = new InjectionToken<
	keyof SuperHeroListState[]
>('SuperHeroListStorageKeys');
export const SUPER_HERO_LIST_FILTER_LOCAL_STORAGE_KEY = new InjectionToken<
	string[]
>('SuperHeroListStorage');
export const SUPER_HERO_LIST_FILTER_CONFIG_TOKEN = new InjectionToken<
	StoreConfig<SuperHeroListState, fromActions.SuperHeroListActions>
>('SuperHeroListConfigToken');
