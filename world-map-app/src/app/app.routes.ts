import { Routes } from '@angular/router';
import { WorldmapComponent } from './worldmap/worldmap.component';

export const routes: Routes = [
    { path: 'worldmap', component: WorldmapComponent },
    { path: '' , redirectTo:'/worldmap', pathMatch:'full' }
];
