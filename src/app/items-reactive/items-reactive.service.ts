import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
// links as items
import { Items, Item, ItemService } from "./Item";
import { Link } from "../links/state/link.model";

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
