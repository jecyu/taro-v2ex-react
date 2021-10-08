import { Component } from "react";
import "./app.scss";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

const reducers = combineReducers({
  thread: (state = {}, action) => {
    if (action.type === "SET_CURRENT_THREAD") {
      return {
        ...state as {},
        ...action.thread,
      };
    }
    return state;
  },
});
const store = createStore(reducers);

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  render() {
    // this.props.children 是将要会渲染的页面
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
