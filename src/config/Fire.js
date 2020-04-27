import firebase from 'firebase';


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-analytics.js"></script>


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCgbJH9tX9949ILOZ0YJ0yiP0zHK2dE4E0",
    authDomain: "sihdashboard.firebaseapp.com",
    databaseURL: "https://sihdashboard.firebaseio.com",
    projectId: "sihdashboard",
    storageBucket: "sihdashboard.appspot.com",
    messagingSenderId: "695184324951",
    appId: "1:695184324951:web:bae15596e163a1ae5b6612",
    measurementId: "G-H913LDC2NL"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;

