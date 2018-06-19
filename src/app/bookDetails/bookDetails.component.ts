import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.model';
import { Router, ActivatedRoute } from "@angular/router";
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review.model';
import { UserService } from '../shared/user.service';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
    templateUrl: 'bookDetails.component.html',
    styleUrls: ['bookDetails.component.css']
})

export class BookDetailsComponent implements OnInit {

    static URL = 'bookDetails/:id';

    title = 'Reviews by users';
    displayedColumns = ['review'];

    dataSource = new MatTableDataSource<Review>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    bookId: string;
    book: Book;

    reviews: Review[];
    reviewText: string;
    reviewEdit: Review;

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

            this.reviewService.setBook(this.bookId);

            this.reviewService.getAllReviews().subscribe(reviewData => {
                this.dataSource.data = reviewData;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                //this.reviews = reviewData;
            });


        });

    }

    postReview(){
        let review: Review = { book: this.book, text: this.reviewText };
        this.reviewService.create( review ).subscribe();
    }

    reviewOwner( review: Review ){
        return this.userService.isAuthenticated() && this.userService.getLoginUser() === review.user.username;
    }


    editReview( review: Review ){
        this.reviewEdit = review;
    }

    saveReview( review: Review ){
        this.reviewService.update(this.reviewEdit).subscribe(data => {
            
        });
        this.reviewEdit = undefined;
    }

    cancelReview( review: Review ){
        this.reviewEdit = undefined;
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