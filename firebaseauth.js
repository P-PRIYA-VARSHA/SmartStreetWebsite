// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTvuYHtl8Itqa8JD6RYp7oY7081FubX8c",
  authDomain: "login-a571a.firebaseapp.com",
  databaseURL: "https://login-a571a-default-rtdb.firebaseio.com",
  projectId: "login-a571a",
  storageBucket: "login-a571a.appspot.com",
  messagingSenderId: "976195879444",
  appId: "1:976195879444:web:0367f418e9b8f693839d01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  const signUp = document.getElementById('submitSignUp');
  if (signUp) {
    signUp.addEventListener('click', (event) => {
      event.preventDefault();
      const email = document.getElementById('rEmail').value;
      const password = document.getElementById('rPassword').value;
      const firstName = document.getElementById('fName').value;
      const lastName = document.getElementById('lName').value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName
          };
          showMessage('Account created successfully', 'signUpMessage');
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, userData)
            .then(() => {
              window.location.href = 'login.html';
            })
            .catch((error) => {
              console.error("Error writing document", error);
              showMessage('Error saving user data', 'signUpMessage');
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            showMessage('Email already exists', 'signUpMessage');
          } else {
            showMessage('Unable to create user: ' + error.message, 'signUpMessage');
          }
        });
    });
  }

  const signIn = document.getElementById('submitSignIn');
  if (signIn) {
    signIn.addEventListener('click', (event) => {
      event.preventDefault();
      const email = document.getElementById('sEmail').value;
      const password = document.getElementById('sPassword').value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          showMessage('Signed in successfully', 'signInMessage');
          // Redirect to a new page or update UI
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          showMessage('Sign-in error: ' + errorMessage, 'signInMessage');
        });
    });
  }
});