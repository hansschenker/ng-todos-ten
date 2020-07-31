import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// api
import { environment } from "../../environments/environment";
// generic item definitions
import { Items, Item, ItemService } from "../shared/Item";

type Todo = Item;
interface Todos extends Items<Todo> {}

@Injectable({
  providedIn: "root",
})
export class TodoService implements ItemService<Todo> {
  baseUrl = environment.baseUrl;
  endpoint = "/todos";
  constructor(private http: HttpClient) {}
  getAll<Todos>() {
    return this.http.get<Todos>(this.baseUrl + this.endpoint);
  }
}
