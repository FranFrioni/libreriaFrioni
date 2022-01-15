import { IonImg, IonSpinner, IonToast, IonHeader, IonButtons, IonBackButton, IonSearchbar, IonContent, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonList, IonItemSliding, IonThumbnail, IonGrid, IonRow, IonItemOption, IonItemOptions, IonIcon, IonCard, IonCardTitle, IonCardHeader, IonToolbar} from "@ionic/react"
import { useDispatch, useSelector } from "react-redux";
import { getFilter, getSearchBooks, getSearchText, getBook, getFavoritesBooks } from "../reducers/Books"
import { starOutline, star} from "ionicons/icons";
import { useEffect, useState} from 'react';

const Search = () => {
    const dispatch = useDispatch();
    const Books = useSelector(state => state.Books);
    const searchText = Books.searchText;
    const filter = Books.filter;
    const searchBooks = Books.searchBooks;
    const favoriteBooks = Books.favoriteBooks;
    const darkMode = Books.darkMode;
    const [showToast, setShowToast] = useState(false);
    const [showToastText, setShowToastText] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    const switchSpinner = () => {
        setShowSpinner(true);
    }
    useEffect( () => {
        if (searchText === ""){
            setShowSpinner(false);
        } else if (searchText !== "" && searchBooks.length === 0){
            setShowSpinner(false);
        }
    }, [searchBooks])
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
            <IonHeader>
                <IonToolbar color="primary" lines="none">
                    <IonButtons slot="start">
                        <IonBackButton color="light"></IonBackButton>
                    </IonButtons>
                    <IonSearchbar debounce="1000" value={searchText} onIonChange={e => {
                        switchSpinner();
                        dispatch(getSearchText(e.detail.value));
                        dispatch(getSearchBooks(filter, e.detail.value));
                    }}></IonSearchbar>
                </IonToolbar>
                <IonItem lines="full" color="primary">
                    <IonLabel color="light">Filter: </IonLabel>
                    {darkMode === true ? 
                    <IonSelect className="selectDark" value={filter} onIonChange={e => {
                        dispatch(getFilter(e.detail.value));
                        dispatch(getSearchBooks(e.detail.value, searchText));
                        }} interface="popover">
                        <IonSelectOption value="title">Book Title</IonSelectOption>
                        <IonSelectOption value="author">Authors</IonSelectOption>
                        <IonSelectOption value="publisher">Publishers</IonSelectOption>
                        <IonSelectOption value="date">Release Date</IonSelectOption>
                        <IonSelectOption value="tag">Tags</IonSelectOption>
                        <IonSelectOption value="keyword">Key Words</IonSelectOption>
                    </IonSelect>
                    : <IonSelect className="selectLight" value={filter} onIonChange={e => {
                        dispatch(getFilter(e.detail.value));
                        dispatch(getSearchBooks(e.detail.value, searchText));
                        }} interface="popover">
                        <IonSelectOption value="title">Book Title</IonSelectOption>
                        <IonSelectOption value="author">Authors</IonSelectOption>
                        <IonSelectOption value="publisher">Publishers</IonSelectOption>
                        <IonSelectOption value="date">Release Date</IonSelectOption>
                        <IonSelectOption value="tag">Tags</IonSelectOption>
                        <IonSelectOption value="keyword">Key Words</IonSelectOption>
                    </IonSelect>}
                </IonItem>
                </IonHeader>
                <IonContent>
                {showSpinner && searchBooks.length === 0 ? <IonSpinner className="ion-justify-content-center"></IonSpinner> :
                <IonList>
                    {searchBooks.length === 0 && searchText === "" ? <IonCard><IonCardHeader><IonCardTitle>Nothing is showing right now, use the searchbar above to see some results.</IonCardTitle></IonCardHeader></IonCard>: <></>}
                    {searchBooks.length === 0 && searchText !== "" ? <IonCard><IonCardHeader><IonCardTitle>There are no results for this search, try something else.</IonCardTitle></IonCardHeader></IonCard>: <></>}
                    {searchBooks.map(i => {
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
 
export default Search;