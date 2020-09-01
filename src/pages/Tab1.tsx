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
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from "@ionic/react";
import { doLogout, deleteObject } from "../utils/parse-lib";
import MyContext from "../utils/parse-hooks";
import React, { useEffect, useContext } from "react";
import "./Tab1.css";
import { useHistory } from "react-router";
import { logOutOutline, trashBinOutline } from "ionicons/icons";

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
          <IonTitle>List Objects</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={async () => {
                await doLogout();
                history.replace("/login");
              }}
            >
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardSubtitle>Back4App: Getting Started</IonCardSubtitle>
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
                  <Item
                    document={d}
                    onDelete={() => deleteObject(d)}
                    key={d.id}
                  />
                );
              })}
            </IonList>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Tab1);

const Item: React.FC<{
  document: Parse.Object;
  onDelete: Function;
}> = React.memo(({ document, onDelete }) => {
  return (
    <IonItemSliding key={document.id}>
      <IonItem style={{ "--padding-start": 0 }}>
        <IonThumbnail
          slot="start"
          style={{
            height: 130,
            width: 130,
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
      <IonItemOptions>
        <IonItemOption onClick={() => onDelete()} color="danger">
          <IonIcon icon={trashBinOutline} size="large" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
});
