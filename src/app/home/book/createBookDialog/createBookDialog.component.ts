import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Book } from '../../shared/book.model';
import { BookService } from '../book.service';


@Component({
    selector: 'app-createBookDialog',
    templateUrl: 'createBookDialog.component.html',
})

export class CreateBookDialogComponent {

    book: Book;

    constructor(private bookService: BookService,
        private snackBar: MatSnackBar) {
        this.book = { title: '' };
    }

    create() {
        this.bookService.create(this.book).subscribe( data => {
            this.snackBar.open( "Book created successfully", 'Message', {
                duration: 2000
            });
        });
        
    }
}
