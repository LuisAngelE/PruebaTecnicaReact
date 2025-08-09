import { BrowserRouter as Router, Switch } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={AdminRoutes} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
