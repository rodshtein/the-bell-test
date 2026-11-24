import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Showcase } from './showcase/showcase';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'showcase', component: Showcase },
];
