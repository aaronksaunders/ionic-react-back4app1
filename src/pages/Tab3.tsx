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
  IonProgressBar
} from "@ionic/react";
import AddImage from "./components/AddImage";

import { uploadWithFile, IThing } from "../utils/parse-lib";
import { RouteComponentProps } from "react-router-dom";
import MyContext from "../utils/parse-hooks";

const Tab3Page: React.FC<any> = ({ history }: RouteComponentProps<any>) => {

  // let { useLoadObjects } = useContext(MyContext) as any
  const { addObject } = useContext(MyContext) as any

  // track the name of the thing
  let [thingName, setThingName] = useState("");

  // track the file associated with the thing
  let [thingFile, setThingFile] = useState({
    imageData: null as (any | null),
    file: null as (File | null)
  });
  // manage the visibility of the progress indicator
  let [progress, setProgress] = useState({
    visible: false,
    value: 0
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
        fileName: thingFile.imageData.fileName
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
