import { Book } from './book.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpService } from '../core/http.service';

@Injectable()
export class BookService {

  static END_POINT = '/books';
  private books: Subject<Book[]> = new Subject();

  constructor(private httpService: HttpService) {
  }

  getAllBooks(): Observable<Book[]> {
    this.readAll();
    return this.books.asObservable();
  }

  private readAll(): void {
    this.httpService.get(BookService.END_POINT).subscribe(
      (booksArray: Book[]) => this.books.next(booksArray),
    );
  }

  read(id: string): Observable<Book> {
    return this.httpService.get(BookService.END_POINT + '/' + id).map(
      data => {
        return data;
      }
    );
  }

  create(book: Book): Observable<Book> {
    return this.httpService.post(BookService.END_POINT, book).map(data => {
      this.readAll();
      return data;
    });
  }

  update(book: Book): Observable<Book> {
    return this.httpService.put(BookService.END_POINT + '/' + book._id, book).map(data => {
      this.readAll();
      return data;
    });
  }

  delete(id: string): Observable<Book> {
    return this.httpService.delete(BookService.END_POINT + '/' + id).map(data => {
      this.readAll();
      return data;
    });
  }

}
