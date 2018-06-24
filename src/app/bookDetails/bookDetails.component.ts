import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.model';
import { Router, ActivatedRoute } from "@angular/router";
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review.model';
import { UserService } from '../shared/user.service';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BookReviewsComponent } from './bookReviews/bookReviews.component';

@Component({
    templateUrl: 'bookDetails.component.html',
    styleUrls: ['bookDetails.component.css']
})

export class BookDetailsComponent implements OnInit {

    static URL = 'bookDetails/:id';

    dataSource = new MatTableDataSource<Review>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    bookId: string;
    book: Book;


    propertyString: string;

    genreUpdate: string;
    tagsUpdate: string;

    constructor(private bookService: BookService, private reviewService: ReviewService, private userService: UserService,
        private router: Router, private route: ActivatedRoute) {

        this.route.params.subscribe(params => this.bookId = params['id']);
        this.book = { title: "default", image: "default" };

        this.propertyString = '';

    }

    ngOnInit(): void {
        this.synchronize();
    }

    synchronize() {
        this.bookService.read(this.bookId).subscribe(data => {
            this.book = data;
            this.genreUpdate = this.book.genre.join(", ");
            this.tagsUpdate = this.book.tags.join(", ");
        });

    }


    









    editProperty(propertyKey: string) {
        this.propertyString = propertyKey;
    }

    cancelProperty() {
        this.propertyString = '';
        this.genreUpdate = this.book.genre.join(", ");
        this.tagsUpdate = this.book.tags.join(", ");
    }

    saveProperty() {
        this.propertyString = '';
        this.book.genre = this.genreUpdate.split(", ");
        this.book.tags = this.tagsUpdate.split(", ");

        this.bookService.update(this.book).subscribe();
    }

    editPropertyActive(property: string) {
        return this.userService.isAuthenticated() && this.propertyString === property;
    }



}