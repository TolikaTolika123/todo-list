
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from "../index";

import { addToMain, changeCountNumber, toggleActive } from './functions.js';
import { inbox } from './filters.js';


const userPicElement = document.querySelector('.user-picture');
const userNameElement = document.querySelector('.user-name');
const signOutBtn = document.querySelector('.sign-out');
const signInBtn = document.querySelector('.sign-in');

let projectsList = [];


async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
  // loadTodos()
}

function signOutUser() {
  signOut(getAuth());
}

function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), authStateObserver)
}

function getProfilePicUrl() {
  return getAuth().currentUser.photoURL;
}

function getUserName() {
  return getAuth().currentUser.displayName;
}

function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

async function authStateObserver(user) {
  if (user) {
    // user is signed in
    const userSnap = await getDoc(doc(db, "users", user.uid));
    
    if (!userSnap.exists()) {
      // Create user document in database if doesn't exist
      await setDoc(doc(db, "users", user.uid), { inbox: inbox.items, projects: projectsList });
    } else {
      // Load and data from firestore
      const { inbox: firebaseInbox, projects: firebasePojects } = userSnap.data();
      inbox.items = firebaseInbox
      projectsList = firebasePojects
      addToMain(inbox)
      changeCountNumber(inbox)
      toggleActive(inbox)
    }

    // Show user information
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();

    userPicElement.style.backgroundImage =
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    userPicElement.removeAttribute('hidden');
    userNameElement.removeAttribute('hidden');
    signOutBtn.removeAttribute('hidden');

    // Hide sign-in button.
    signInBtn.setAttribute('hidden', 'true');
  } else {
    // User is signed out!
    // Load and save data to localStorage
    if (localStorage.getItem('inbox')) inbox.items = JSON.parse(localStorage.getItem('inbox'))
    if (localStorage.getItem('projects')) projectsList = JSON.parse(localStorage.getItem('projects'))
    addToMain(inbox)
    changeCountNumber(inbox)
    toggleActive(inbox)

    // Hide user's profile and sign-out button.
    userPicElement.setAttribute('hidden', 'true');
    userNameElement.setAttribute('hidden', 'true');
    signOutBtn.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInBtn.removeAttribute('hidden');
  }
}

function isUserSignedIn() {
  return !!getAuth().currentUser;
}

signInBtn.addEventListener('click', signIn);
signOutBtn.addEventListener('click', signOutUser)

export { initFirebaseAuth, isUserSignedIn, projectsList }