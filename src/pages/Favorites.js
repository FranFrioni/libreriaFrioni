import { IonImg, IonTitle, IonToast, IonIcon, IonItemOptions, IonItemOption, IonThumbnail, IonGrid, IonRow, IonLabel, IonItem, IonItemSliding, IonList, IonCard, IonCardHeader, IonCardTitle, IonHeader, IonButtons, IonBackButton, IonContent, IonPage, IonToolbar } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { starOutline, star } from "ionicons/icons";
import { getBook, getFavoritesBooks } from "../reducers/Books"
import { useState} from 'react';

const Favorites = () => {
    const dispatch = useDispatch();
    const Books = useSelector(state => state.Books);
    const FavoriteBooks = Books.favoriteBooks;
    const [showToast, setShowToast] = useState(false);
    const [showToastText, setShowToastText] = useState("");
    const isFavorite = (bookId) => {
        for (let i = 0; i < FavoriteBooks.length; i++){
            if (FavoriteBooks[i].ID === bookId){
                return true;
            }
        }
        return false;
    }

    return ( 
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton color="light"></IonBackButton>
                    </IonButtons>
                    <IonTitle color="light">Favorites</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonList>
                    {FavoriteBooks.length === 0 ? <IonCard><IonCardHeader><IonCardTitle>Nothing is showing right now, make sure you have books in favorite.</IonCardTitle></IonCardHeader></IonCard>: <></>}
                    {FavoriteBooks.map(i => {
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
                <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={showToastText}
                duration={1000}
            />
            </IonContent>
        </IonPage>
     );
}
 
export default Favorites;