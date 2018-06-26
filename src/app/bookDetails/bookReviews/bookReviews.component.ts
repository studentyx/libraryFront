import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';
import { ReviewService } from '../../shared/review.service';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Review } from '../../shared/review.model';
import { Book } from '../../shared/book.model';


@Component({
    templateUrl: 'bookReviews.component.html',
    selector: 'app-bookReviews'
})

export class BookReviewsComponent implements OnInit {

    @Input() book: Book;
    reviewText: string;
    reviewEdit: Review;
    displayedColumns = ['avatar', 'review'];

    dataSource = new MatTableDataSource<Review>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private reviewService: ReviewService, private userService: UserService) {

    }

    ngOnInit(): void {
        this.reviewService.setBook(this.book._id);
        this.reviewService.getAllReviews().subscribe(reviewData => {
            this.dataSource.data = reviewData;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    formatDate( dt: Date ): string{
        let date = new Date( dt );
        let locale = "en-us";
        return date.toLocaleString(locale, {month: "long"}) 
        + " " + date.getDay() 
        + ", " + date.getFullYear();
    }
    postReview() {
        let review: Review = { book: this.book, text: this.reviewText };
        this.reviewService.create(review).subscribe();
    }

    reviewOwner(review: Review) {
        return this.userService.isAuthenticated()
            && (this.userService.getRol() === 'admin' || this.userService.getLoginUser() === review.user.username);
    }


    editReview(review: Review) {
        this.reviewEdit = review;
    }

    saveReview(review: Review) {
        this.reviewService.update(this.reviewEdit).subscribe(data => {

        });
        this.reviewEdit = undefined;
    }

    cancelReview(review: Review) {
        this.reviewEdit = undefined;
    }

    deleteReview(review: Review) {
        if (confirm("Are you sure you want to delete this review?")) {
            this.reviewService.delete(review._id).subscribe();
        }
    }

}