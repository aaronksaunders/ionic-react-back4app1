import React from "react";
import { Redirect, Route, Switch, RouteProps } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import TabRoot from "./pages/TabRoot";
import Login from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useAuthb4a } from "./pages/Login";

const App: React.FC = () => {
  let { user, Parse } = useAuthb4a();
  console.log(user);

  const ProtectedRoute: React.ComponentType<any> = ({
    component: Component,
    ...rest
  }: {
    component: React.ComponentType<RouteProps>;
  }) => (
    <Route
      {...rest}
      render={props => {
        return Parse.User.current ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Redirect exact from="/" to="home" />
          <IonRouterOutlet>
            <ProtectedRoute name="home" path="/home" component={TabRoot} />
          </IonRouterOutlet>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
