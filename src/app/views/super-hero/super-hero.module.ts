import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SuperHeroRoutingModule } from './super-hero-routing.module';
import { SupeHeroListPageComponent } from './pages/supe-hero-list-page/supe-hero-list-page.component';
import { SupeHeroDetailPageComponent } from './pages/supe-hero-detail-page/supe-hero-detail-page.component';
import { LocalStorageService } from 'src/app/core/store/local-storage.service';
import { storageMetaReducer } from 'src/app/core/store/storage-meta.reducer';
import { StoreModule } from '@ngrx/store';
import * as superHeroListReducer from '../../core/store/super-hero-list/super-hero-list.reducer';
import { SUPER_HERO_LIST_FILTER_CONFIG_TOKEN, SUPER_HERO_LIST_FILTER_LOCAL_STORAGE_KEY, SUPER_HERO_LIST_FILTER_STORAGE_KEYS } from 'src/app/core/store/super-hero-list/super-hero-list.tokens';

export function getStoreFilters(saveKeys: string[], localStorageKey: string, storageService: LocalStorageService) {
  return {metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)]};
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperHeroRoutingModule,
    StoreModule.forFeature('superHeroListFilter', superHeroListReducer.reducer, SUPER_HERO_LIST_FILTER_CONFIG_TOKEN)
  ],
  declarations: [
    SupeHeroListPageComponent,
    SupeHeroDetailPageComponent
  ],
  providers: [
    { provide: SUPER_HERO_LIST_FILTER_LOCAL_STORAGE_KEY, useValue: '__supe_hero_list_filter_storage__' },
    { provide: SUPER_HERO_LIST_FILTER_STORAGE_KEYS, useValue: ['superHeroListFilter.heros'] },
    {
      provide: SUPER_HERO_LIST_FILTER_CONFIG_TOKEN,
      deps: [
        SUPER_HERO_LIST_FILTER_STORAGE_KEYS,
        SUPER_HERO_LIST_FILTER_LOCAL_STORAGE_KEY,
        LocalStorageService
      ],
      useFactory: getStoreFilters
    }
  ]
})
export class SuperHeroModule { }
