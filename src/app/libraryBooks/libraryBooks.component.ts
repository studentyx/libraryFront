import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.model';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CreateBookDialogComponent } from './createBookDialog/createBookDialog.component';

@Component({
    templateUrl: 'libraryBooks.component.html',
    styleUrls: ['libraryBooks.component.css']
})

export class LibraryBooksComponent implements OnInit {

    static URL = 'libraryBooks';

    displayedColumns = ['image', 'title', 'actions'];
    dataSource = new MatTableDataSource<Book>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dialog: MatDialog, private bookService: BookService) {
    }

    ngOnInit(): void {
        this.synchronize();
    }

    synchronize() {
        this.bookService.getAllBooks().subscribe(books => {
            this.dataSource.data = books;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    createBookDialog() {
        let dialogRef = this.dialog.open(CreateBookDialogComponent, {
            width: '320px'
        });
    }

    deleteBook(id: string) {
        if (confirm("Are you sure you want to delete this book?")) {
            this.bookService.delete(id).subscribe();
        }
    }

    detailsBook(id: string) {
    }

}