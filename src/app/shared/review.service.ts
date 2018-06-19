import { Review } from './review.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpService } from '../core/http.service';

@Injectable()
export class ReviewService {

    static END_POINT = '/reviews';
    private bookId: string = undefined;

    private reviews: Subject<Review[]> = new Subject();

    constructor(private httpService: HttpService) {
    }

    getAllReviews(): Observable<Review[]> {
        this.readAll();
        return this.reviews.asObservable();
    }

    setBook(bookId: string): void {
        this.bookId = bookId;
    }

    readAll(): void {
        this.httpService.param("book._id", this.bookId).get(ReviewService.END_POINT).subscribe(
            (reviewsArray: Review[]) => this.reviews.next(reviewsArray),
        );
    }

    create(review: Review): Observable<boolean> {
        return this.httpService.post(ReviewService.END_POINT, review).map(
            data => {
                this.readAll();
                return true;
            },
            error => {
                return false;
            }
        );
    }

    delete(id: string): Observable<Review> {
        return this.httpService.delete(ReviewService.END_POINT + '/' + id).map(data => {
            this.readAll();
            return data;
        });
    }

    update(review: Review): Observable<Review> {
        return this.httpService.put(ReviewService.END_POINT + '/' + review._id, review).map(data => {
            this.readAll();
            return data;
        });
    }

}