import React, { useState } from "react";
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from "@ionic/react";

const Details: React.FC = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const doSignIn = () => {
    console.log("username", username);
    console.log("password", password);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>LOGIN</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email Address</IonLabel>
          <IonInput
            type="email"
            value={username}
            onInput={e => setUserName((e.target as HTMLInputElement).value)}
            style={{
              width: "94%"
            }}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onInput={e => setPassword((e.target as HTMLInputElement).value)}
            style={{
              width: "94%"
            }}
          />
        </IonItem>
        <div
          style={{ justifyContent: "center", display: "flex", paddingTop: 8 }}
        >
          <IonButton onClick={doSignIn}>LOGIN</IonButton>
          <IonButton
            onClick={() => {
              setPassword("");
              setUserName("");
            }}
          >
            RESET
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Details;
