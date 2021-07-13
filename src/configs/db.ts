import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyBfSKb6hwtvMqWSvAfBqkBRScJVutS98lw',
    authDomain: 'e120721.firebaseapp.com',
    databaseURL:
        'https://e120721-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'e120721',
    storageBucket: 'e120721.appspot.com',
    messagingSenderId: '331663342600',
    appId: '1:331663342600:web:2249c40894a96b8bab25bd',
    measurementId: 'G-8NTXL6PY3N',
};
firebase.initializeApp(firebaseConfig);
export default firebase.database();
