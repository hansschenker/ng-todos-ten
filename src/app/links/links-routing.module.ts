import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LinksComponent } from "./links.component";
import { LinkDetailsComponent } from "./components/link-details.component";

const routes: Routes = [
  {
    path: "",
    component: LinksComponent,
    children: [{ path: ":id", component: LinkDetailsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinksRoutingModule {}
