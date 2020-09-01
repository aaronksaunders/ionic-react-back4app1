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
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useParseDataProvider } from "../utils/parse-hooks";

const LoginPage: React.FC = () => {
  const history = useHistory();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { doLogin } = useParseDataProvider();

  const doSignIn = async () => {
    try {
      let user = await doLogin(username, password);
      history.replace("/home/tab1");
      return user;
    } catch (e) {
      alert(e);
    }
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
            onInput={(e) => setUserName((e.target as HTMLInputElement).value)}
            style={{
              width: "94%",
            }}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            style={{
              width: "94%",
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

export default LoginPage;
