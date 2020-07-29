import { Component } from "@angular/core";

@Component({
  selector: "hs-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <hs-counter></hs-counter>
      <hs-links-reactive></hs-links-reactive>
      <a routerLink="/links">Links</a>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = "ng-todos-ten";
}
