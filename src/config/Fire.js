import firebase from 'firebase';


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-analytics.js"></script>


// Your web app's Firebase configuration apiKey: "AIzaSyCgbJH9tX9949ILOZ0YJ0yiP0zHK2dE4E0",
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAIGnWKE81qpSrGY7r9VF0xX2wY1jJ7s8",
    authDomain: "water-management-sys.firebaseapp.com",
    databaseURL: "https://water-management-sys.firebaseio.com",
    projectId: "water-management-sys",
    storageBucket: "water-management-sys.appspot.com",
    messagingSenderId: "422733645961",
    appId: "1:422733645961:web:fa4c729082c733a9701e58",
    measurementId: "G-RVZJ7X22PL"
  };
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;

