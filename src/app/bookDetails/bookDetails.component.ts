import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.model';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../shared/user.service';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BookReviewsComponent } from './bookReviews/bookReviews.component';

@Component({
    templateUrl: 'bookDetails.component.html',
    styleUrls: ['bookDetails.component.css']
})

export class BookDetailsComponent implements OnInit {

    static URL = 'bookDetails/:id';

    bookId: string;
    book: Book;

    constructor(private bookService: BookService, private userService: UserService,
        private router: Router, private route: ActivatedRoute) {

        this.route.params.subscribe(params => this.bookId = params['id']);
        this.book = { title: "default", image: "default" };

    }

    ngOnInit(): void {
        this.bookService.read(this.bookId).subscribe(data => {
            this.book = data;
        });
    }

    manageBookPrivileges(){
        let rol = this.userService.getRol();
        return rol == 'admin' || rol == 'bookManager';
    }

    saveProperty(){
        this.bookService.update(this.book).subscribe();
    }

}