import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { PropertiesListComponent } from './components/properties/properties-list/properties-list.component';
import { PropertyDetailComponent } from './components/properties/property-detail/property-detail.component';
import { PropertyCardComponent } from './components/properties/property-card/property-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewPropertyComponent } from './components/properties/new-property/new-property.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './components/footer/footer.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RedirectPageComponent } from './components/redirect-page/redirect-page.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { FiltersPipe } from './pipes/filters.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MulticheckboxComponent } from './components/multicheckbox/multicheckbox.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FilterFeauturePipe } from './pipes/filterFeatures.pipe';
import { petPipe } from './pipes/petsPipe.pipe';
import { wifiPipe } from './pipes/wifiPipe.pipe';
import { terracePipe } from './pipes/terracePipe.pipe';
import { poolPipe } from './pipes/poolPipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PropertiesComponent,
    PropertiesListComponent,
    PropertyDetailComponent,
    PropertyCardComponent,
    NewPropertyComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    UserProfileComponent,
    RedirectPageComponent,
    FilterPipe,
    FilterFeauturePipe,
    SortPipe,
    FiltersPipe,
    petPipe,
    wifiPipe,
    terracePipe,
    poolPipe,
    LoadingSpinnerComponent,
    MulticheckboxComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    SwiperModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
