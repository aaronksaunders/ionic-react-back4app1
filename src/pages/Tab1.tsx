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
  IonProgressBar,
} from "@ionic/react";
import { doLogout } from "../utils/parse-lib";
import MyContext from "../utils/parse-hooks";
import React, { useEffect, useContext } from "react";
import "./Tab1.css";
import { useHistory } from "react-router";

const Tab1: React.FC<any> = () => {
  let { myObjects, loading, loadParseObjects } = useContext(MyContext) as any;
  const history = useHistory();

  useEffect(() => {
    (async () => await loadParseObjects())();
  }, []);

  console.log(loading);

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
                return <Item document={d} key={d.id} />;
              })}
            </IonList>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Tab1);

const Item: React.FC<{ document: Parse.Object }> = React.memo(
  ({ document }) => {
    return (
      <IonItem key={document.id}>
        <IonThumbnail
          slot="start"
          style={{
            height: 150,
            width: 150,
            backgroundColor: "lightGray",
          }}
        >
          <IonImg
            src={document.get("asset").url()}
            style={{ objectFit: "scale-down" }}
          ></IonImg>
        </IonThumbnail>
        <IonLabel className="ion-text-wrap">
          <h1>{document.get("name")}</h1>
          <h3>{document.createdAt.toDateString()}</h3>
          <h3>{document.get("asset").name()}</h3>
          <h3> {document.id}</h3>
        </IonLabel>
      </IonItem>
    );
  }
);
