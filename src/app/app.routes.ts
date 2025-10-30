import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'grocery-list', pathMatch: 'full' },
  {
    path: 'grocery-list',
    loadComponent: () => import('./grocery-list/grocery-list.page').then(m => m.GroceryListPage)
  },
  {
    path: 'memorize/:count',
    loadComponent: () => import('./memorize/memorize.page').then(m => m.MemorizePage)
  },
  {
    path: 'game',
    loadComponent: () => import('./game/game.page').then(m => m.GamePage)
  }
];
