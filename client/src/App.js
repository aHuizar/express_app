import "./App.css";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import List from "./components/List";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/list">
          <List />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
