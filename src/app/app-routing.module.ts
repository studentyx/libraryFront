import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LibraryBooksComponent } from './home/book/libraryBooks/libraryBooks.component';
import { BookDetailsComponent } from './home/book/bookDetails/bookDetails.component';
import { ProfileComponent } from './home/user/profile/profile.component';
import { BookReviewsComponent } from './home/reviews/bookReviews/bookReviews.component';
import { PropertyComponent } from './core/property.component';
import { PropertyBookDetailsComponent } from './core/propertyBookDetails.component';
import { CreateBookDialogComponent } from './home/book/createBookDialog/createBookDialog.component';
import { LoginComponent } from './home/user/login/login-dialog.component';
import { RegisterDialogComponent } from './home/user/registerDialog/registerDialog.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: HomeComponent.URL + '/' + LibraryBooksComponent.URL },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: LibraryBooksComponent.URL, component: LibraryBooksComponent },
      { path: BookDetailsComponent.URL, component: BookDetailsComponent },
      { path: ProfileComponent.URL, component: ProfileComponent },
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
    ProfileComponent,
    BookReviewsComponent,
    PropertyComponent,
    PropertyBookDetailsComponent,
    
  ];

  static DIALOGS_COMPONENTS = [
    CreateBookDialogComponent,
    LoginComponent,
    RegisterDialogComponent,
  ];
}

