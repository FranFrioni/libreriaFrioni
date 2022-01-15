import { useIonViewDidEnter, IonContent, IonItem, IonIcon, IonLabel, IonToggle, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import { moon } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { getDarkMode } from "../reducers/Books"

const Configuration = () => {
    const dispatch = useDispatch();
    const Books = useSelector(state => state.Books);
    const darkMode = Books.darkMode;
    useIonViewDidEnter(() => {
        const toggle = document.querySelector('#themeToggle');
        toggle.addEventListener('ionChange', (ev) => {
            document.body.classList.toggle('dark', ev.detail.checked);
            dispatch(getDarkMode(ev.detail.checked));
        });
    })
    return (
        <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonBackButton color="light"></IonBackButton>
                        </IonButtons>
                        <IonTitle color="light">Configuration</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem lines="full">
                        <IonIcon slot="start" icon={moon}></IonIcon>
                            <IonLabel>
                                Toggle Dark Theme
                            </IonLabel>
                        <IonToggle id="themeToggle" slot="end" checked={darkMode}></IonToggle>
                    </IonItem>
                </IonContent> 
        </IonPage>
    );
}

export default Configuration;