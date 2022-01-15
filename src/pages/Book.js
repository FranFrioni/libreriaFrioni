import { IonItem, useIonViewDidLeave, IonSpinner, IonToast, IonChip, IonLabel, IonText, IonToolbar, IonHeader, IonButtons, IonBackButton, IonContent, IonPage, IonButton, IonIcon, IonImg, IonGrid, IonRow} from "@ionic/react";
import { starOutline, star, arrowDownOutline, personOutline, arrowUpOutline, calendarNumberOutline, languageOutline, documentsOutline, businessOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritesBooks, cleanBook } from "../reducers/Books"
import { useState} from 'react';

const Book = () => {
    const dispatch = useDispatch();
    const Books = useSelector(state => state.Books);
    const Book = Books.book[0];
    const favoriteBooks = Books.favoriteBooks;
    const [showToast, setShowToast] = useState(false);
    const [showToastText, setShowToastText] = useState("");
    const [showDetails, setShowDetails] = useState(false);
    const [showDefault, setShowDefault] = useState(false);

    useIonViewDidLeave(() => {
        dispatch(cleanBook());
    })

    const showingDetails = () => {
        setShowDetails(true);
        if (showDetails){
            setShowDetails(false);
        }
    }
    const isFavorite = (bookId) => {
        for (let i = 0; i < favoriteBooks.length; i++){
            if (favoriteBooks[i].ID === bookId){
                return true;
            }
        }
        return false;
    }

    const gridTags = (tags) => {
        if (tags.length <= 3){
            return (
                <div>
                    <IonItem lines="none"><IonText className="bookTags">Tags</IonText></IonItem>
                    <IonGrid>
                        <IonRow className="row">
                            {tags.map(e => <IonChip disabled="true" className="align" size="small"><IonLabel>{e.name}</IonLabel></IonChip>)}
                        </IonRow>
                    </IonGrid>
                </div>
            );
        } else if (tags.length <= 6){
            return(
                <div>
                <IonItem lines="none"><IonText className="bookTags">Tags</IonText></IonItem>
                <IonGrid>
                    <IonRow className="row">
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[0].name}</IonLabel></IonChip>
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[1].name}</IonLabel></IonChip>
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[2].name}</IonLabel></IonChip>
                    </IonRow>
                    <IonRow className="row">
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[3].name}</IonLabel></IonChip>
                        {tags.length === 5 ?
                            <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[4].name}</IonLabel></IonChip>
                            : tags.length === 6 ?
                            <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[5].name}</IonLabel></IonChip>
                            : <></>
                        }
                    </IonRow>
                </IonGrid>
                </div>
            );
        } else if (tags.length <= 9){
            return(
                <div>
                <IonItem lines="none"><IonText className="bookTags">Tags</IonText></IonItem>
                <IonGrid>
                    <IonRow className="row">
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[0].name}</IonLabel></IonChip>
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[1].name}</IonLabel></IonChip>
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[2].name}</IonLabel></IonChip>
                    </IonRow>
                    <IonRow className="row">
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[3].name}</IonLabel></IonChip>
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[4].name}</IonLabel></IonChip>
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[5].name}</IonLabel></IonChip>
                    </IonRow>
                    <IonRow className="row">
                        <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[6].name}</IonLabel></IonChip>
                        {tags.length === 8 ?
                            <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[7].name}</IonLabel></IonChip>
                            : tags.length === 9 ?
                            <IonChip disabled="true" className="align" size="small"><IonLabel>{tags[8].name}</IonLabel></IonChip>
                            : <></>
                        }
                    </IonRow>
                </IonGrid>
                </div>
            );
        }
    }
    return ( 
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton color="light"></IonBackButton>
                    </IonButtons>
                    {Book ?
                    isFavorite(Book.ID) ? 
                    <IonButton fill="clear" color="light" onClick={() => {dispatch(getFavoritesBooks(Book))
                        setShowToastText("Book removed from favorites.");
                        setShowToast(true);
                    }} slot="end"><IonIcon slot="icon-only" icon={star}></IonIcon></IonButton>
                    :
                    <IonButton fill="clear" color="light" onClick={() => {dispatch(getFavoritesBooks(Book))
                        setShowToastText("Book added to favorites.");
                        setShowToast(true);
                    }} slot="end"><IonIcon slot="icon-only" icon={starOutline}></IonIcon></IonButton>
                    : <></>}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {Book ?
                <div>
                    {!showDefault ?
                    <IonImg className="bookImg" src={Book.cover} onIonError={() => setShowDefault(true)}></IonImg>
                    : <IonImg className="bookImg" src="assets/images/missingbook.png"></IonImg>}
                    <IonItem lines="full"><IonText className="bookTitle">{Book.title}</IonText></IonItem>
                    <IonItem lines="full"><IonIcon icon={personOutline} slot="start"></IonIcon><IonText>{Book.author}</IonText></IonItem>
                    <IonItem lines="full"><IonText className="bookContent">{Book.content_short}</IonText></IonItem>
                    <IonItem lines="none"><IonText className="bookTags">Categories</IonText></IonItem>
                    <IonGrid>
                        <IonRow className="row">
                            {Book.categories.map(e => {
                                return <IonChip className="align" disabled="true" size="small"><IonLabel>{e.name}</IonLabel></IonChip>
                            })}
                        </IonRow>
                    </IonGrid>
                    {!showDetails ?
                    <IonItem detail="true" detailIcon={arrowDownOutline} lines="full" onClick={() => showingDetails() }>
                        <IonLabel>Details</IonLabel>
                    </IonItem>
                    :
                    <IonItem detail="true" detailIcon={arrowUpOutline} lines="full" onClick={() => showingDetails() }>
                        <IonLabel>Details</IonLabel>
                    </IonItem>}
                    {showDetails ?
                    <div>
                    <IonItem lines="full"><IonIcon icon={businessOutline} slot="start"></IonIcon><IonText>{"Publisher: " + Book.publisher}</IonText></IonItem>
                    <IonItem lines="full"><IonIcon icon={calendarNumberOutline} slot="start"></IonIcon><IonText>{"Release Date: " + Book.publisher_date}</IonText></IonItem>
                    <IonItem lines="full"><IonIcon icon={languageOutline} slot="start"></IonIcon><IonText>{"Language: " + Book.language}</IonText></IonItem>
                    <IonItem lines="full"><IonIcon icon={documentsOutline} slot="start"></IonIcon><IonText>{"Pages: " + Book.pages}</IonText></IonItem>
                    {gridTags(Book.tags)}
                    </div>: <></>}
                </div>
                :<IonSpinner className="ion-justify-content-center"></IonSpinner>}
            </IonContent>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={showToastText}
                duration={1000}
            />
        </IonPage>
     );
}
 
export default Book;