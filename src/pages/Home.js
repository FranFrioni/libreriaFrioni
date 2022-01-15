import { IonImg, IonFooter, IonSpinner, IonGrid,IonRow , IonThumbnail, IonItemSliding, IonItemOptions, IonItemOption, IonToast, useIonViewWillEnter, IonMenuButton, IonPage, IonTitle, IonToolbar, IonMenu,IonHeader,IonContent,IonList,IonItem,IonLabel,IonRouterOutlet, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/react';
import { searchOutline, starOutline, libraryOutline, star, settingsOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { getBooksLastWeek, getFavoritesBooks, getBook } from '../reducers/Books';
import { useState} from 'react';

import './Home.css';
const Home = () => {
  const dispatch = useDispatch();
  const Books = useSelector(state => state.Books);
  const BooksLastWeek = Books.booksLastWeek;
  const favoriteBooks = Books.favoriteBooks;
  const [showToast, setShowToast] = useState(false);
  const [showToastText, setShowToastText] = useState("");

  useIonViewWillEnter(() => {
    dispatch(getBooksLastWeek());
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    let darkMode = JSON.parse(localStorage.getItem("darkMode"));
    if(favorites == null){
      localStorage.setItem("favorites", JSON.stringify([]))
    }
    if(darkMode == null){
      localStorage.setItem("darkMode", false)
    }
    if (darkMode){
      document.body.classList.toggle('dark', darkMode);
  }
  })

  const isFavorite = (bookId) => {
    for (let i = 0; i < favoriteBooks.length; i++){
        if (favoriteBooks[i].ID === bookId){
            return true;
        }
    }
    return false;
  }

  return (
    <IonPage>
      <IonMenu contentId="mainMenu">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle color="light">Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem lines="full" routerLink="/categories">
              <IonIcon icon={libraryOutline} slot="start"></IonIcon>
              <IonLabel>Categories</IonLabel>
            </IonItem>
            <IonItem lines="full" routerLink="/search">
              <IonIcon icon={searchOutline} slot="start"></IonIcon>
              <IonLabel>Search Book</IonLabel>
            </IonItem>
            <IonItem lines="full" routerLink="/favorites">
              <IonIcon icon={starOutline} slot="start"></IonIcon>
              <IonLabel>Favorites</IonLabel>
            </IonItem>
            <IonItem lines="full" routerLink="/configuration">
              <IonIcon icon={settingsOutline} slot="start"></IonIcon>
              <IonLabel>Configuration</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
        <IonFooter><IonToolbar><IonTitle slot="end" className="footerText">Made by Francesco Frioni</IonTitle></IonToolbar></IonFooter>
      </IonMenu>
      <IonRouterOutlet id="mainMenu"></IonRouterOutlet>

      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton color="light" slot="start"></IonMenuButton>
          <IonTitle color="light">Frioni's Library</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      
      <IonContent>
        <IonCard>
          <IonImg src="assets/images/library.jpg"></IonImg>
          <IonCardHeader>
            <IonCardTitle>About Us</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Everyone is welcome to visit the public service locations of the Frioni's Library to access our collections and resources. With a library card, Frioni's employees may also borrow most library books, magazines and journals as well as remotely access the Library’s online resources.
          </IonCardContent>
        </IonCard>
        <IonItem lines="full" color="primary"><IonTitle color="light">Last Week Releases</IonTitle></IonItem>
        {BooksLastWeek.length === 0 ? <IonSpinner className="ion-justify-content-center"></IonSpinner> :
        <IonList>
          {BooksLastWeek.map(i => {
              return (
                  <IonItemSliding key={i.ID}>
                      <IonItem lines="full" key={i.ID} routerLink={"/book/" + i.ID} onClick={() => dispatch(getBook(i.ID))}>
                      <IonThumbnail  key={i.ID} slot="start"><IonImg id={i.ID} src={i.thumbnail} onIonError={(e) => e.target.setAttribute("src", "assets/images/missingthumbnail.png")}></IonImg></IonThumbnail>
                          <IonGrid>
                              <IonRow><IonLabel color="primary">{i.title}</IonLabel></IonRow>
                              <IonRow><IonLabel color="dark">{i.author}</IonLabel></IonRow>
                              <IonRow><IonLabel color="medium">{i.publisher}</IonLabel></IonRow>
                          </IonGrid>
                      </IonItem>
                      {isFavorite(i.ID) ? 
                          <IonItemOptions side="end">
                          <IonItemOption color="success" onClick={() => {
                              dispatch(getFavoritesBooks(i));
                              setShowToastText("Book removed from favorites.");
                              setShowToast(true);
                              }}>
                              <IonIcon icon={star}></IonIcon>
                              </IonItemOption>
                          </IonItemOptions>
                      :
                      <IonItemOptions side="end">
                              <IonItemOption onClick={() => {
                                  dispatch(getFavoritesBooks(i));
                                  setShowToastText("Book added to favorites.");
                                  setShowToast(true);
                                  }}>
                                  <IonIcon icon={starOutline}></IonIcon>
                              </IonItemOption>
                      </IonItemOptions>
                      }
                  </IonItemSliding>
              );
          })}
      </IonList>
          }
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={showToastText}
                    duration={1000}
                />
            </IonContent>
    </IonPage>
  );
};

export default Home;
