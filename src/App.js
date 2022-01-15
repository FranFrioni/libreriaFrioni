import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import store from './reducers/store';
import Search from './pages/Search';
import Book from './pages/Book';
import Favorites from './pages/Favorites';
import Categories from './pages/Categories';
import BooksList from './pages/BooksList';
import Configuration from './pages/Configuration';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => (
  <IonApp>
    <Provider store={store}>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/search">
            <Search/>
          </Route>
          <Route exact path="/favorites">
            <Favorites/>
          </Route>
          <Route path="/book">
            <Book/>
          </Route>
          <Route exact path="/categories">
            <Categories/>
          </Route>
          <Route path="/category">
            <BooksList/>
          </Route>
          <Route exact path="/configuration">
            <Configuration/>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </Provider>
  </IonApp>
);

export default App;
