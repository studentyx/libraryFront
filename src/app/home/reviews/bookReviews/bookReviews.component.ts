import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Book } from '../../shared/book.model';
import { ReviewService } from '../review.service';
import { Review } from '../../shared/review.model';


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

    userReview: Review = undefined;

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

    loginUserReview() {
        this.userReview = this.dataSource.data.find(review => review.user.username == this.userService.getLoginUser());
        return this.userReview;
    }

    formatDate(dt: Date): string {
        let date = new Date(dt);
        let locale = "en-us";
        return date.toLocaleString(locale, { month: "long" })
            + " " + date.getDate()
            + ", " + date.getFullYear();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filterPredicate = (data, filter) => {
            const dataStr = data.user.username;
            return dataStr.indexOf(filter) != -1;
        }
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    postReview() {
        let review: Review = { book: this.book, text: this.reviewText };
        this.reviewService.create(review).subscribe();
        this.reviewText = '';
    }

    reviewOwner(review: Review) {
        return this.userService.isAuthenticated()
            && (this.userService.getRol() === 'admin' || this.userService.getLoginUser() === review.user.username);
    }


    editReview(review: Review) {
        this.reviewEdit = review;
        this.reviewText = review.text;
    }

    saveReview(review: Review) {
        this.reviewService.update(this.reviewEdit).subscribe(data => {

        });
        this.finishEdit();
    }

    cancelReview(review: Review) {
        review.text = this.reviewText;
        this.finishEdit();
    }

    private finishEdit(): void{
        this.reviewEdit = undefined;
        this.reviewText = '';
    }

    deleteReview(review: Review) {
        if (confirm("Are you sure you want to delete this review?")) {
            this.reviewService.delete(review._id).subscribe();
        }
    }

}