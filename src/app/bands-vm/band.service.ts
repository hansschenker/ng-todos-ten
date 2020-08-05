import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// api
import { environment } from "../../environments/environment";
import { Band } from "./band-model";

@Injectable({
  providedIn: "root",
})
export class BandService {
  // props
  baseUrl = environment.baseUrl;
  endpoint = "/bands";
  bands$ = this.http.get<Band[]>(this.baseUrl + this.endpoint);
  // methods
  constructor(private http: HttpClient) {}
  bands() {
    return this.http.get<Band[]>(this.baseUrl + this.endpoint);
  }
}
