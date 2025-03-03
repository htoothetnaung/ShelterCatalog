import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { DogListComponent } from './components/dog-list/dog-list.component';
import { CatListComponent } from './components/cat-list/cat-list.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetDetailComponent } from './components/pet-detail/pet-detail.component';
import { FormsModule } from '@angular/forms';  
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import {UserPetdetailComponent} from './user-petdetail/user-petdetail.component';
import { UserCatlistComponent } from './user-catlist/user-catlist.component';
import { UserDoglistComponent } from './user-doglist/user-doglist.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { PostComponent } from './post/post.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { UsersComponent } from './users/users.component';
import { AdminPostComponent } from './admin-post/admin-post.component';
import { AdoptionRequestComponent } from './adoption-request/adoption-request.component';
import { AdoptionHistoryComponent } from './adoption-history/adoption-history.component';
import { AdminPostDetailComponent } from './admin-post-detail/admin-post-detail.component';
import { AdminUserProfileComponent } from './admin-user-profile/admin-user-profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';


export const routes: Routes = [
  { path: 'petlist', component: PetListComponent },
  { path: 'dogs', component: DogListComponent },
  { path: 'cats', component: CatListComponent },
  { path: 'pet/:id', component: PetDetailComponent },
  { path: 'adoption-form/:id', component: AdoptionFormComponent } ,
  { path: 'confirmation', component: ConfirmationComponent }, 
  { path: 'userpet/:id', component: UserPetdetailComponent },
  { path: 'userdogs', component: UserDoglistComponent },
  { path: 'usercats', component: UserCatlistComponent },
  { path: '', redirectTo: '/petlist', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  { path: 'userProfile', component: UserProfileComponent },
  { path: 'post', component: PostComponent },

  {path: 'adminLogin', component: AdminLoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'userProfile/:id', component: UserProfileComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'adminPost', component: AdminPostComponent, canActivate: [AuthGuard]},
  { path: 'adoption_request', component: AdoptionRequestComponent, canActivate: [AuthGuard] }, 
    { path: 'adoption_history', component: AdoptionHistoryComponent , canActivate: [AuthGuard]},
  {path: 'adminPostDetails/:id', component: AdminPostDetailComponent, canActivate: [AuthGuard]},

  {path: '**', component: ErrorPageComponent},
  {path: 'adminUserProfile/:id', component: AdminUserProfileComponent, canActivate: [AuthGuard]}
];



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(FormsModule)  
  ]
};
