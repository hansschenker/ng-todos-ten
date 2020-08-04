import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// api
import { environment } from "../../environments/environment";
// generic item definitions
import { Items, Item, ItemService } from "../shared/Item";

type Link = Item;
interface Links extends Items<Link> {}

@Injectable({
  providedIn: "root",
})
export class ItemsReactiveService implements ItemService<Link> {
  baseUrl = environment.baseUrl;
  endpoint = "/links";
  constructor(private http: HttpClient) {}
  todos<Links>() {
    return this.http.get<Links>(this.baseUrl + this.endpoint);
  }
}
