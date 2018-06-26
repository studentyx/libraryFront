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
    book: Book = undefined;

    constructor(private bookService: BookService, private userService: UserService,
        private router: Router, private route: ActivatedRoute) {

        this.route.params.subscribe(params => this.bookId = params['id']);
    }

    ngOnInit(): void {
        this.bookService.read(this.bookId).subscribe(data => {
            this.book = data;
        }); 
    }

    saveProperty(){
        this.bookService.update(this.book).subscribe();
    }

}