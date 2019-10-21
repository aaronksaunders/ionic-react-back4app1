import PARSE_CONFIG from "../parse-config";
import React, { useState } from "react";
import Parse, { User } from "parse";
import { loadObjects } from "./parse-lib";


const MyContext = React.createContext({})

export const MyProvider = MyContext.Provider
export const MyConsumer = MyContext.Consumer
export default MyContext


/**
 *
 */
export const useCheckAuth = () => {
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

export const useLoadObjects = () => {
  let [myObjects, setMyObjects] = useState([] as Object[]);
  let [loading, setLoading] = useState(false);

  const addObject = (_object: any) => {
    let newArray = [_object, ...myObjects]
    setMyObjects(newArray);
  };

  const loadParseObjects = () => {
    setLoading(true);
    loadObjects("Thing")
      .then(setMyObjects)
      .finally(() => setTimeout(() => setLoading(false), 1000));
  };
  return {
    myObjects,
    loading,
    loadParseObjects,
    addObject
  };
};
