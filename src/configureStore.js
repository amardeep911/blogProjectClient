import { createStoreHook } from "react-redux";
import reducers from "./Reducers";
import { createStore } from "redux";
export default function configureStore() {
  const store = createStore(reducers);
  return store;
}
