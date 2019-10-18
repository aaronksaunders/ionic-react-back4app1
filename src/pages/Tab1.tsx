import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel
} from "@ionic/react";
// import { book, build, colorFill, grid } from "ionicons/icons";
import { doLogout, loadObjects } from "../parse-lib";
import React, { useEffect, useState } from "react";
import "./Tab1.css";

const Tab1: React.FC = () => {
  let [myObjects, setMyObjects] = useState([] as Object[]);

  useEffect(() => {
    loadObjects("Thing").then(setMyObjects);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Welcome to Ionic</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Now that your app has been created, you'll want to start building
              out features and components. Check out some of the resources below
              for next steps.
            </p>
          </IonCardContent>
        </IonCard>

        <div className="ion-padding">
          <IonList>
            {myObjects.map((doc: any) => {
              let d = doc as Parse.Object;
              return (
                <IonItem key={d.id}>
                  <IonLabel className="ion-text-wrap">
                    <h1>{d.get("name")}</h1>
                    <h2>{d.createdAt.toDateString()}</h2>
                    <div> {d.id}</div>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
          <IonButton
            onClick={async () => {
              await doLogout();
            }}
          >
            LOGOUT
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
