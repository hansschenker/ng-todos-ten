import "./style.css";
console.clear();

// begin lesson code
import { ObservableStore } from "./state";

interface UserState {
  name: string;
  isAuthenticated: boolean;
}
const initalUserState = {
  name: "joe",
  isAuthenticated: true,
};
const store1 = new ObservableStore(initalUserState);

/*
 * Select a slice of state from store.
 */
store1.selectState("user").subscribe(console.log);

/*
 * Update a property with new value.
 */
store1.updateState({
  user: "hans",
});

store1.updateState({
  isAuthenticated: true,
});

/*
 * Selected state above (user) only emits when value has changed
 * for the requested property.
 */
store1.updateState({
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
