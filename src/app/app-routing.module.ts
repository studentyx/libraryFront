import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LibraryBooksComponent } from './libraryBooks/libraryBooks.component';
import { CreateBookDialogComponent } from './libraryBooks/createBookDialog/createBookDialog.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: HomeComponent.URL + '/' + LibraryBooksComponent.URL },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: LibraryBooksComponent.URL, component: LibraryBooksComponent },
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
  ];

  static DIALOGS_COMPONENTS = [
    CreateBookDialogComponent,
  ];
}

