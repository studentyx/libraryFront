import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LibraryBooksComponent } from './libraryBooks/libraryBooks.component';
import { CreateBookDialogComponent } from './libraryBooks/createBookDialog/createBookDialog.component';
import { BookDetailsComponent } from './bookDetails/bookDetails.component';
import { LoginComponent } from './home/login/login-dialog.component';
import { SignUpComponent } from './user/signUp/signUp.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: HomeComponent.URL + '/' + LibraryBooksComponent.URL },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: LibraryBooksComponent.URL, component: LibraryBooksComponent },
      { path: BookDetailsComponent.URL, component: BookDetailsComponent },
      { path: SignUpComponent.URL, component: SignUpComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  static COMPONENTS = [
    HomeComponent,
    LibraryBooksComponent, 
    BookDetailsComponent,
    SignUpComponent,
  ];

  static DIALOGS_COMPONENTS = [
    CreateBookDialogComponent,
    LoginComponent,
  ];
}

