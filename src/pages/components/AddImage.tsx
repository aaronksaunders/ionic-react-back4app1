import {
  IonButton,
  IonIcon
} from "@ionic/react";
import { camera, trash } from "ionicons/icons";
import React from "react";

import { useState } from "react";

const AddImage: React.FunctionComponent<any> = ({
  onChange
}: any) => {
  const [imageThumb, setImageThumb] = useState("");

  const Styles = {
    picWrapper: {
      padding: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  };
  const setImage = (_event: any) => {
    let f = _event.target.files![0];

    if (typeof FileReader === "function") {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        let imageData = {
          dataUrl: event.target.result,
          format: f.type.split("/")[1],
          fileName: f.name
        };
        onChange({imageData, file : f});
        setImageThumb(imageData.dataUrl);
      };
      reader.onerror = _error => {
        console.log(_error);
      };
      reader.readAsDataURL(f);
    } else {
      alert("Sorry, FileReader API not supported");
    }
  };

  const clearImage = () => {
    setImageThumb("");
    onChange(null);
  };
  const openFileDialog = () => {
    (document as any).getElementById("file-upload").click();
  };

  return (
    <>
      <div style={Styles.picWrapper}>
        <div style={{ width: 200, objectFit: "contain" }}>
          <img src={imageThumb} alt={""}/>
        </div>
      </div>
      <div style={Styles.picWrapper}>
        <input
          type="file"
          id="file-upload"
          style={{ display: "none" }}
          onChange={setImage}
        />
        <IonButton onClick={openFileDialog}>
          <IonIcon slot="icon-only" icon={camera}></IonIcon>
        </IonButton>
        <IonButton onClick={clearImage} color="danger">
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonButton>
      </div>
    </>
  );
};

export default AddImage;