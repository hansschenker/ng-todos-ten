import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { LinksRoutingModule } from "./links-routing.module";
import { LinksComponent } from "./links.component";
import { LinkListComponent } from "./components/link-list.component";
import { LinkListItemComponent } from "./components/link-list-item.component";
import { LinkListFormComponent } from "./components/link-list-form.component";
import { LinkListSearchComponent } from "./components/link-list-search.component";
import { LinkListFilterComponent } from "./components/link-list-filter.component";
import { LinkDataService } from "./state/link.data-service";
import { LinkDetailsComponent } from './components/link-details.component';

@NgModule({
  declarations: [
    LinksComponent,
    LinkListComponent,
    LinkListItemComponent,
    LinkListFormComponent,
    LinkListSearchComponent,
    LinkListFilterComponent,
    LinkDetailsComponent,
  ],
  imports: [CommonModule, HttpClientModule, LinksRoutingModule],
  exports: [
    LinksComponent,
    LinkListComponent,
    LinkListItemComponent,
    LinkListFormComponent,
    LinkListSearchComponent,
    LinkListFilterComponent,
    LinkDetailsComponent,
  ],
  providers: [LinkDataService],
})
export class LinksModule {}
