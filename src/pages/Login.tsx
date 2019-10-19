import Parse, { User } from "parse";
import { doLogin } from "../parse-lib";
import PARSE_CONFIG from "../parse-config";
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
import { RouteComponentProps } from "react-router-dom";

declare module "parse";

const LoginPage: React.FC<any> = ({ history }: RouteComponentProps<any>) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const doSignIn = async () => {
    try {
      let u = await doLogin(username, password);
      history.replace("/home");
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

export default LoginPage;

export const useAuthb4a = () => {
  Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
  Parse.initialize(PARSE_CONFIG.APP_ID, PARSE_CONFIG.JS_KEY);

  const [state, setAuthState] = React.useState({
    initializing: true,
    user: null as User | null,
    Parse
  });

  React.useEffect(() => {
    // listen for auth state changes
    Parse.User.currentAsync().then(user => {
      setAuthState({ initializing: false, user, Parse });
    });
  }, []);

  return state;
};
