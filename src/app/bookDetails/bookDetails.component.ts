import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.model';
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: 'bookDetails.component.html',
    styleUrls: ['bookDetails.component.css']
})

export class BookDetailsComponent implements OnInit {

    static URL = 'bookDetails/:id';

    bookId: string;
    book: Book;

    constructor(private bookService: BookService,
        private route: ActivatedRoute) {
        this.route.params.subscribe(params => this.bookId = params['id']);
        this.book = { title: "default", image: "default" }
    }

    ngOnInit(): void {
        this.synchronize();
    }

    synchronize() {
        this.bookService.read(this.bookId).subscribe(data => {
            this.book = data;
        });
    }

}