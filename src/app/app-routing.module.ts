import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NewPropertyComponent } from './components/properties/new-property/new-property.component';
import { PropertiesListComponent } from './components/properties/properties-list/properties-list.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { PropertyDetailComponent } from './components/properties/property-detail/property-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  {
    path: 'properties',
    component: PropertiesComponent,
    children: [{ path: '', component: PropertiesListComponent }],
  },
  { path: 'properties/:id', component: PropertyDetailComponent },
  {
    path: 'newproperty',
    component: NewPropertyComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'userprofile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
