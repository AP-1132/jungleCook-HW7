import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

import { changePage } from "../model/model.js";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHpMtUvT9S-0s96k3Kwgi_GENJn0E62s8",
  authDomain: "mobile-class-2b641.firebaseapp.com",
  projectId: "mobile-class-2b641",
  storageBucket: "mobile-class-2b641.firebasestorage.app",
  messagingSenderId: "353071430577",
  appId: "1:353071430577:web:d27cc12da5c4951d42db90",
  measurementId: "G-2HQ6Y5RCTJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export let canSeeInformation = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.displayName || user.email);
    canSeeInformation = true;

    $("#your-recipes-a, #your-recipes-a-mobile").removeClass("hidden");
    $("#create-recipe-a, #create-recipe-a-mobile").addClass("hidden");
    $(".login-section, .sign-up-section").addClass("hidden");
    $(".auth-content").removeClass("hidden");
  } else {
    console.log("No user is signed in.");
    canSeeInformation = false;

    $("#your-recipes-a, #your-recipes-link-a").addClass("hidden");
    $("#create-recipe-a, #create-recipe-a-mobile").removeClass("hidden");
    $(".login-section, .sign-up-section").removeClass("hidden");
    $(".auth-content").addClass("hidden");
  }
});

function initAuthListeners() {
  $("#app").on("click", "#login-btn", () => {
    let email = $("#login-email").val();
    let password = $("#login-password").val();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User logged in successfully");
        // window.location.hash = "home";
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert(error.message);
      });
  });

  $("#app").on("click", "#signup-btn", () => {
    let email = $("#signup-email").val();
    let password = $("#signup-password").val();
    let fName = $("#signup-fname").val();
    let lName = $("#signup-lname").val();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: `${fName} ${lName}`,
        });
      })
      .then(() => {
        console.log("User signed up and profile updated successfully!");
        // window.location.hash = "home";
      })
      .catch((error) => {
        console.error("Error signing up or updating profile:", error);
        alert(error.message);
      });
  });

  $("#app").on("click", "#signOut-btn", (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // window.location.hash = "home";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });
}

function initListeners() {
  $("#hamburger-icon").on("click", (e) => {
    e.preventDefault();
    $(".mobile-nav").toggleClass("mobile-nav-open");
    $("header").toggleClass("mobile-header-open");
    $("#app").toggleClass("mobile-screen");
    $("footer").toggleClass("mobile-screen");
  });
}

function route() {
  let hastTag = window.location.hash;
  let pageID = hastTag.replace("#", "");
  if (pageID === "") {
    pageID = "home";
  }

  changePage(pageID);
}

function initRouting() {
  $(window).on("hashchange", route);
  route();
}

$(document).ready(function () {
  initRouting();
  initListeners();
  initAuthListeners();
});
