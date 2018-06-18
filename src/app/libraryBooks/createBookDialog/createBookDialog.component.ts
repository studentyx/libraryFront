import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from '../../shared/book.service';
import { Book } from '../../shared/book.model';


@Component({
    selector: 'app-createBookDialog',
    templateUrl: 'createBookDialog.component.html',
})

export class CreateBookDialogComponent {

    book: Book;

    constructor(private bookService: BookService) {
        this.book = { title: '', image: '' };
    }

    create() {
        this.bookService.create(this.book).subscribe();
    }
}
