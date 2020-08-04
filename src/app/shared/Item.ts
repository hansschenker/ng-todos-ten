import { Observable } from "rxjs";

export interface Item {
  id: number;
  text: string;
  category?: string;
  url?: string;
  imageUrl?: string;
  createdAt?: string;
  author?: string;
}

export interface Items<T> {
  items: T[];
}

export interface ViewModel<T> {
  items: T[];
  selectedItem?: T;
  currentId: number;
}

export interface ItemService<T> {
  items$<T>(): Observable<T>;
}
