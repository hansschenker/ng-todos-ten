import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CounterModule } from "./counter/counter.module";
// import { LinksModule } from "./links/links.module";
import { LinksReactiveModule } from "./links-reactive/links-reactive.module";
import { ItemsReactiveModule } from "./items-reactive/items-reactive.module";
import { TodosModule } from './todos/todos.module';
import { StateModule } from './state/state.module';
import { RxStateModule } from './rx-state/rx-state.module';
import { TodosVmModule } from './todos-vm/todos-vm.module';
import { BandsVmModule } from './bands-vm/bands-vm.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CounterModule,
    LinksReactiveModule,
    AppRoutingModule,
    ItemsReactiveModule,
    TodosModule,
    StateModule,
    RxStateModule,
    TodosVmModule,
    BandsVmModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
