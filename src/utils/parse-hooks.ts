import PARSE_CONFIG from "../parse-config";
import React from "react";
import Parse, { User } from "parse";

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
  