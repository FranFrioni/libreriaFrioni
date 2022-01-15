import { IonSpinner, useIonViewWillEnter, IonLabel, IonPage, IonList, IonItem, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCategory, getBooksCategories, getSelectedCategory} from '../reducers/Books';

const Categories = () => {
    const dispatch = useDispatch();
    const Books = useSelector(state => state.Books);
    const categories = Books.categories;

    useIonViewWillEnter(() => {
        dispatch(getCategories())
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton color="light"></IonBackButton>
                    </IonButtons>
                    <IonTitle color="light">Categories</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {categories.length === 0 ? <IonSpinner className="ion-justify-content-center"></IonSpinner> :
            <IonList>
            {categories.map(cat => {
                return (
                    <IonItem key={cat.category_id} lines="full" routerLink={"/category/" + cat.category_id} onClick={() => {
                        dispatch(getSelectedCategory(cat.category_id));
                        dispatch(getCategory(cat.name));
                        dispatch(getBooksCategories(cat.category_id))}}>
                        <IonLabel>{cat.name}</IonLabel>
                    </IonItem>
                );
            })}
            </IonList>
            }
            </IonContent>
        </IonPage>
    );
}

export default Categories;