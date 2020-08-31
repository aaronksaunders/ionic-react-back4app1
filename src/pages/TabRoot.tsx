import React from "react";
import { apps, flash, send } from "ionicons/icons";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Details from "./Details";

import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";

const TabRoot:React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/home/tab1" component={Tab1} exact={true} />
        <Route path="/home/tab2" component={Tab2} exact={true} />
        <Route path="/home/tab2/details" component={Details} />
        <Route path="/home/tab3" component={Tab3} />
        <Route exact path="/" render={() => <Redirect to="/home/tab1" />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/home/tab1">
          <IonIcon icon={flash} />
          <IonLabel>Tab One</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/home/tab2">
          <IonIcon icon={apps} />
          <IonLabel>Tab Two</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/home/tab3">
          <IonIcon icon={send} />
          <IonLabel>Tab Three</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default React.memo(TabRoot);
