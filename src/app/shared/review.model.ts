import {Book} from './book.model';
import { User } from './user.model';

export interface Review {
    _id?: string;
    user?: User;
    book?: Book;
    text: string;
}

