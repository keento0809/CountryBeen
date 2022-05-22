import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Main />
      </Provider>
    </Router>
  );
}

export default App;
