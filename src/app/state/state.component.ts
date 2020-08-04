import "./style.css";
import { ObservableStore } from "./state";
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

interface UserState {
  name: string;
  isAuthenticated: boolean;
}
const

@Component({
  selector: 'hs-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateComponent implements OnInit {


  
  // begin lesson code
  
 initalUserState = {
      name: "joe",
      isAuthenticated: true,
  }
  const store = new ObservableStore<UserState>(this.initalUserState);
  
  /*
   * Select a slice of state from store.
   */
  store.selectState("user").subscribe(console.log);
  
  /*
   * Update a property with new value.
   */
  store.updateState({
    user: "hans",
  });
  
  store.updateState({
    isAuthenticated: true,
  });
  
  /*
   * Selected state above (user) only emits when value has changed
   * for the requested property.
   */
  store.updateState({
    isAuthenticated: false,
  });
  
  /********************
   * Have a question, comment, or just want to chat about RxJS?
   * Ping me on Ultimate Courses slack or on
   * Twitter https://twitter.com/btroncone
   * I look forward to hearing from you!
   * For additional RxJS info and operator examples check out
   * Learn RxJS (https://www.learnrxjs.io) and
   * the Ultimate Course RxJS blog!
   * (https://ultimatecourses.com/blog/category/rxjs)
   ********************/
  

}
