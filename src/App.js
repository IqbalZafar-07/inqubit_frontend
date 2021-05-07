import "./App.css";
import Home from "./components/HomePage/Home";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Product from "./components/Product/Product";
import Location from "./components/Location/Location";
import ProductMovement from "./components/ProductMovement/ProductMovement";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/location">
            <Location />
          </Route>
          <Route path="/productmovement">
            <ProductMovement />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
