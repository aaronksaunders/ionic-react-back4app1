import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from "@ionic/react";
import AddImage from "./components/AddImage";

import  { uploadWithFile, IThing } from "../parse-lib"

const Tab3Page: React.FC = () => {
  let [thingName, setThingName] = useState("");
  let [thingFile, setThingFile] = useState({imageData :({} as any), file : {} as File});

  const saveObject = async () => {
    let thingToSave : IThing = {
      name : thingName,
      file : thingFile.file,
      fileName : thingFile.imageData.fileName
    }

    console.log(thingToSave);
    let result = await uploadWithFile(thingToSave)
    console.log(result)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab Three</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Add An Object w/ File</h2>
        <IonItem>
          <IonItem lines="none">
            <IonLabel position="floating">Thing Name</IonLabel>
            <IonInput
              value={thingName}
              onInput={e => setThingName((e.target as HTMLInputElement).value)}
              style={{
                width: "94%"
              }}
            ></IonInput>
          </IonItem>

        </IonItem>
        <IonItem>
          <AddImage
            onChange={(_eventData: any) => {
              setThingFile(_eventData);
            }}
          ></AddImage>

          </IonItem>
          <IonButton onClick={()=> saveObject()}>SAVE</IonButton>
          <IonButton>CANCEL</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3Page;
