import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

// generic item definitions
import { Items, Item, ItemService } from "./Item";

type Link = Item;
interface Links extends Items<Link> {}

@Injectable({
  providedIn: "root",
})
export class ItemsReactiveService implements ItemService<Link> {
  constructor(private http: HttpClient) {}
  getAll<Links>() {
    return this.http.get<Links>("http://localhost:3000/links");
  }
}
