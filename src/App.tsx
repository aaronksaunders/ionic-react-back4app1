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
import { useCheckAuth } from "./utils/parse-hooks";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import PARSE_CONFIG from './parse-config'

const App: React.FC = () => {
  let { user, Parse } = useCheckAuth();
  console.log(user);

  const client = new ApolloClient({
    uri: PARSE_CONFIG.GRAPHQL_URI,
    headers: {
      "X-Parse-Application-Id": PARSE_CONFIG.APP_ID,
      "X-Parse-Javascript-Key":PARSE_CONFIG.JS_KEY
    }
  });

  /**
   *
   * @param param0
   */
  const ProtectedRoute: React.ComponentType<any> = ({
    component: Component,
    ...rest
  }: {
    component: React.ComponentType<RouteProps>;
  }) => (
    <Route
      {...rest}
      render={props => {
        let u = Parse.User.current();
        return u ? (
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
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};

export default App;
