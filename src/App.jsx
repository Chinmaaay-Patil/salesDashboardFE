import "./App.css";
import SignIn from "./Components/Auth/SignIn/SignIn";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
