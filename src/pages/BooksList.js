import { IonImg, useIonViewWillEnter, useIonViewDidLeave, IonSpinner, IonItemOptions, IonItemOption, IonIcon, IonToast, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItemSliding, IonItem, IonThumbnail, IonGrid, IonRow, IonLabel} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";
import { getBook, getFavoritesBooks, cleanBooksList, getBooksCategories } from "../reducers/Books"
import { starOutline, star} from "ionicons/icons";
import { useState} from 'react';

const BooksList = () => {
    const dispatch = useDispatch();
    const Books = useSelector(state => state.Books);
    const category = Books.category;
    const booksCategories = Books.booksCategories;
    const favoriteBooks = Books.favoriteBooks;
    const selectedCategory = Books.selectedCategory;
    const [showToast, setShowToast] = useState(false);
    const [showToastText, setShowToastText] = useState("");

    useIonViewWillEnter(() => {
        dispatch(getBooksCategories(selectedCategory))
    })
    useIonViewDidLeave(() => {
        dispatch(cleanBooksList());
    })

    const isFavorite = (bookId) => {
        for (let i = 0; i < favoriteBooks.length; i++){
            if (favoriteBooks[i].ID === bookId){
                return true;
            }
        }
        return false;
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton color="light"></IonBackButton>
                    </IonButtons>
                    <IonTitle color="light">{category}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {booksCategories.length === 0 ? <IonSpinner className="ion-justify-content-center"></IonSpinner> :
                <IonList>
                    {booksCategories.map(i => {
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
}

export default BooksList;