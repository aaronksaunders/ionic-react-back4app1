import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonImg,
  IonThumbnail,
  IonButtons,
  IonProgressBar
} from "@ionic/react";
import { doLogout, loadObjects } from "../utils/parse-lib";
import React, { useEffect, useState } from "react";
import "./Tab1.css";
import { RouteComponentProps } from "react-router";

const Tab1: React.FC<any> = ({ history }: RouteComponentProps<any>) => {
  let [myObjects, setMyObjects] = useState([] as Object[]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadObjects("Thing")
      .then(setMyObjects)
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={async () => {
                await doLogout();
                history.replace("/login");
              }}
            >
              LOGOUT
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Sample Ionic Framework Application using React Web Components and
              Back4App Parse Servers
            </p>
          </IonCardContent>
        </IonCard>

        {loading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <div className="ion-padding">
            <IonList>
              {myObjects.map((doc: any) => {
                let d = doc as Parse.Object;
                return (
                  <IonItem key={d.id}>
                    <IonThumbnail
                      slot="start"
                      style={{
                        height: 150,
                        width: 150,
                        backgroundColor: "lightGray"
                      }}
                    >
                      <IonImg
                        src={d.get("asset").url()}
                        style={{ objectFit: "scale-down" }}
                      ></IonImg>
                    </IonThumbnail>
                    <IonLabel className="ion-text-wrap">
                      <h1>{d.get("name")}</h1>
                      <h3>{d.createdAt.toDateString()}</h3>
                      <h3>{d.get("asset").name()}</h3>
                      <h3> {d.id}</h3>
                    </IonLabel>
                  </IonItem>
                );
              })}
            </IonList>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
