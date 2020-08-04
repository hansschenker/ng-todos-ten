import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// api
import { environment } from "../../environments/environment";
import { Todo } from "./todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  baseUrl = environment.baseUrl;
  endpoint = "/todos";
  constructor(private http: HttpClient) {}
  todos() {
    return this.http.get<Todo[]>(this.baseUrl + this.endpoint);
  }
}
