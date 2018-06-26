import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from '../../shared/book.model';
import { BookService } from '../book.service';


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
