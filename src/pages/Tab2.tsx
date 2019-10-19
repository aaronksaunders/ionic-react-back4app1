import React from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonThumbnail,
  IonImg
} from "@ionic/react";

import { useQuery } from "@apollo/react-hooks";
import  { gql } from "apollo-boost";

const GET_ALL_THNGS = gql`
  {
    things {
      results {
        id
        name
        createdAt
        asset {
          name
          url
        }
      }
    }
  }
`;



const Tab2: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_THNGS);

  return (

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Tab Two</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink="/tab2/details">
              <IonLabel>
                <h2>Go to detail</h2>
                {  error ?  <p>{`Error: ${error}`}</p> : null} 
                {  data ?  <p>{`Found: ${data.things.results.length} Things`}</p> : null} 
              </IonLabel>
            </IonItem>
          </IonList>


        {loading ? (
          <p>"LOADING"</p>
        ) : (
          <div className="ion-padding">
            <IonList>
              {data ? data.things.results.map((d: any) => {
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
                        src={d.asset.url}
                        style={{ objectFit: "scale-down" }}
                      ></IonImg>
                    </IonThumbnail>
                    <IonLabel className="ion-text-wrap">
                      <h1>{d.name}</h1>
                      <h3>{d.createdAt}</h3>
                      <h3>{d.asset.name}</h3>
                      <h3> {d.id}</h3>
                    </IonLabel>
                  </IonItem>
                );
              }):null}
            </IonList>
          </div>
        )}
        </IonContent>
      </IonPage>
  );
};

export default Tab2;
