import PARSE_CONFIG from "../parse-config";
import React, { useState } from "react";
import Parse, { User } from "parse";
import { loadObjects, doLogin } from "./parse-lib";

interface IState {
  loadParseObjects: Function;
  addObject: Function;
  loading: boolean;
  myObjects: any;
  user: Parse.User | null;
  initializing: boolean;
  Parse: any;
  doLogin: (email: string, password: string) => Promise<any>;
}

export const ParseDataContext = React.createContext<IState | undefined>(
  undefined
);

export const ParseDataProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    initializing: true,
    user: null as User | null,
    Parse,
  });
  let [myObjects, setMyObjects] = useState([] as Object[]);
  let [loading, setLoading] = useState(false);

  Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
  Parse.initialize(PARSE_CONFIG.APP_ID, PARSE_CONFIG.JS_KEY);

  React.useEffect(() => {
    let user = Parse.User.current();
    if (user) {
      setAuthState({ initializing: false, user, Parse });
    }

    // listen for auth state changes
    Parse.User.currentAsync().then((user) => {
      setAuthState({ initializing: false, user, Parse });
    });
  }, []);

  const _doLogin = async (e: string, p: string) => {
    let user = await doLogin(e, p);
    if (user) setAuthState({ ...authState, user });
    return user;
  };

  const addObject = (_object: any) => {
    let newArray = [_object, ...myObjects];
    setMyObjects(newArray);
  };

  /**
   *
   */
  const loadParseObjects = () => {
    setLoading(true);
    return loadObjects("Thing")
      .then((response: any) => {
        setMyObjects(response);
        setLoading(false);
        return true;
      })
      .catch((e) => {
        console.log("error", e);
        setLoading(false);
        return false;
      });
  };

  // the store object
  let state = {
    loadParseObjects,
    addObject,
    loading,
    myObjects,
    user: authState.user,
    initializing: authState.initializing,
    Parse,
    doLogin: _doLogin,
  };

  // wrap the application in the provider with the initialized context
  return (
    <ParseDataContext.Provider value={state}>
      {children}
    </ParseDataContext.Provider>
  );
};

export default ParseDataContext;
export const useParseDataProvider = () =>
  React.useContext<IState | undefined>(ParseDataContext)!;
