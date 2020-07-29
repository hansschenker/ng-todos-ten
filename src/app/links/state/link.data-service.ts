import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Link } from "./link.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LinkDataService {
  baseUrl = environment.baseUrl;
  //links$: Observable<Link[]> = this.http.get<Link[]>(this.baseUrl + "/links");
  constructor(private http: HttpClient) {
    //this.links$.pipe(tap((ls) => console.log("links:", ls)));
  }
  getLinks() {
    console.log("svc.getLinks:");
    return this.http.get<Link[]>(this.baseUrl + "/links");
  }
}
