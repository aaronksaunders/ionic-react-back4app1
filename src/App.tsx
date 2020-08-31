import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonLoading } from "@ionic/react";
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
import { useParseDataProvider } from "./utils/parse-hooks";

const App: React.FC = () => {
  const { initializing } = useParseDataProvider();
  /**
   *
   * @param param0
   */
  const ProtectedRoute: React.ComponentType<any> = ({
    component: Component,
    ...rest
  }: {
    component: React.ComponentType<RouteProps>;
  }) => {
    const { user } = useParseDataProvider();
    return (
      <Route
        {...rest}
        render={(props) => {
          let u = user;
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
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {initializing ? (
            <IonLoading isOpen={true} />
          ) : (
            <>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute name="home" path="/home" component={TabRoot} />
              <Route path="/" render={() => <Redirect to="/home/tab1" />} />
            </>
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
