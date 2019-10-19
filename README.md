# Ionic ReactJS Back4App Sample Application
WIP starter react ionic framework project tabs with authentication using back4app / parse server

Updating some very old parse code to utilize [back4app parse functionality](https://www.back4app.com/) along with [Ionic Framework React Components](https://ionicframework.com/docs/react/overview), and of course [Capacitor](https://capacitor.ionicframework.com/docs/) to deploy it to your mobile device

- Authentication
    - [Documentation](https://docs.parseplatform.org/js/guide/#users)
- Objects
    - [Documentation](https://docs.parseplatform.org/js/guide/#objects)
- File Upload
- React Router
- Tabs
- Tabs List Detail
- GraphQL Support - See Tab2!!
    - [Back4App GraphQL Documentation](https://docs.parseplatform.org/graphql/guide/#learning-more)

### Adding your own configuration file `parse.config`

```javascript
const config = {
    APP_ID : "",
    JS_KEY : "",
    GRAPHQL_URI : ""
}

export default config;
```

### Adding GraphQL Support

```javascript
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import PARSE_CONFIG from './parse-config'


  const client = new ApolloClient({
    uri: PARSE_CONFIG.GRAPHQL_URI,
    headers: {
      "X-Parse-Application-Id": PARSE_CONFIG.APP_ID,
      "X-Parse-Javascript-Key":PARSE_CONFIG.JS_KEY
    }
  });
```
and wrap you top level component with the provider
```tsx
  return (
    <ApolloProvider client={client}>
      <IonApp>
        <IonReactRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Redirect exact from="/" to="home" />
            <IonRouterOutlet>
              <ProtectedRoute name="home" path="/home" component={TabRoot} />
            </IonRouterOutlet>
          </Switch>
        </IonReactRouter>
      </IonApp>
    </ApolloProvider>
  );
```
