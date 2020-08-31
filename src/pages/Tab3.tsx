import React, { useState, useContext } from "react";
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonProgressBar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
} from "@ionic/react";
import AddImage from "./components/AddImage";

import { uploadWithFile, IThing } from "../utils/parse-lib";
import ParseDataContext from "../utils/parse-hooks";
import { useHistory } from "react-router-dom";

const Tab3Page: React.FC = () => {
  const history = useHistory();
  const { addObject } = useContext(ParseDataContext) as any;

  // track the name of the thing
  let [thingName, setThingName] = useState("");

  // track the file associated with the thing
  let [thingFile, setThingFile] = useState({
    imageData: null as any | null,
    file: null as File | null,
  });
  // manage the visibility of the progress indicator
  let [progress, setProgress] = useState({
    visible: false,
    value: 0,
  });

  /**
   *
   */
  const clearAll = () => {
    setProgress({ visible: false, value: 0 });
    setThingFile({ file: null, imageData: null });
    setThingName("");
  };

  /**
   *
   */
  const saveObject = async () => {
    setProgress({ visible: true, value: 0 });
    try {
      let thingToSave: IThing = {
        name: thingName,
        file: thingFile.file,
        fileName: thingFile.imageData.fileName,
      };

      let result = await uploadWithFile(thingToSave, (_progress: any) => {
        setProgress({ visible: true, value: _progress });
      });

      addObject(result);

      // clear varaiables
      clearAll();

      // go to home page
      history.push("/home/tab1");
    } catch (e) {
      // show error
      alert(e);

      // clear things
      setProgress({ visible: false, value: 0 });
    } finally {
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab Three</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Upload A File</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Sample Ionic Framework Application using React Web Components and
              Back4App Parse Servers where we are uploading the file byt
              associating a Parse.File object with a Parse.Object
            </p>
          </IonCardContent>
        </IonCard>
        <IonItem style={{ "--padding-start": 0 }}>
          <IonLabel position="floating">Thing Name</IonLabel>
          <IonInput
            value={thingName}
            placeholder="Test Description to associate with File"
            onInput={(e) => setThingName((e.target as HTMLInputElement).value)}
          ></IonInput>
        </IonItem>
        <IonItem style={{ "--padding-start": 0 }}>
          <AddImage
            onChange={(_eventData: any) => {
              setThingFile(_eventData);
            }}
          ></AddImage>
        </IonItem>
        {progress.visible ? (
          <IonProgressBar value={progress.value}></IonProgressBar>
        ) : (
          <div>
            <IonButton onClick={() => saveObject()}>SAVE</IonButton>
            <IonButton>CANCEL</IonButton>{" "}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3Page;
