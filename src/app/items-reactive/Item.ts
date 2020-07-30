import { Observable } from "rxjs";
export interface Item {
  id: number;
  text: string;
  url?: string;
  imageUrl?: string;
}

export interface Items<T> {
  items: Item[];
}

export interface ViewModel<T> {
  items: T[];
  selectedItem?: T;
  currentId: number;
}

export interface ItemService<T> {
  getAll<T>(): Observable<T>;
}
