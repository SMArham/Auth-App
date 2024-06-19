import "./style.css";

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQUCXf2KzhOBzZiyAOiQZz5bDnLqnwea8",
  authDomain: "first-hello-67ab0.firebaseapp.com",
  databaseURL: "https://first-hello-67ab0-default-rtdb.firebaseio.com",
  projectId: "first-hello-67ab0",
  storageBucket: "first-hello-67ab0.appspot.com",
  messagingSenderId: "668893748956",
  appId: "1:668893748956:web:b3e74151ff3ad708099e19",
  measurementId: "G-RNZKTJJYRS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log(app);

const notify = document.querySelector("#notify");

//___________________ Signup User____________________

function createUser() {
  const email = document.querySelector("#email").value;
  console.log("Email: " + email);
  const password = document.querySelector("#password").value;
  console.log("Password: " + password);
  const notify = document.querySelector("#notify"); // Define notify

  if (email === "" || password === "") {
    notify.innerText = "Please Provide Email And Password !!";
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          notify.innerText = "User Created Successfully";
        } else {
          notify.innerText = "Something Went Wrong";
        }
      })
      .catch((err) => {
        console.log(err);
        notify.innerText = `Error: ${err.message}`; // Display error to the user
      });
  }
}

const SignUp_btn = document.querySelector("#SignUp");
SignUp_btn.addEventListener("click", createUser);

// ________________login___________________

function loginUser() {
  const email = document.querySelector("#email").value;
  console.log("Email: " + email);
  const password = document.querySelector("#password").value;
  console.log("Password: " + password);
  if (email == "" || password == "") {
    notify.innerText = "Please Provide Email And Password !!";
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("login user");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const login_btn = document.querySelector("#login");
login_btn.addEventListener("click", loginUser);

// _____________After login_______________

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector(".user_form").classList.add("hide");
    document.querySelector(".admin_page").classList.add("show");
  }
});

//___________________logout_____________

function logoutUser() {
  signOut(auth)
    .then(() => {
      document.querySelector(".user_form").classList.remove("hide");
      document.querySelector(".admin_page").classList.remove("show");
    })
    .catch((err) => {
      console.log(err);
    });
}

const logout = document.querySelector("#logout");
logout.addEventListener("click", logoutUser);

// __________forget password______________

const notify2 = document.querySelector(".notify2");

function showForgetPasswordForm() {
  document.querySelector(".forget_password").classList.add("visible");
}

function forgetPassword() {
  const email = document.querySelector("#forget_email").value;
  if (email === "") {
    notify2.innerText = "please enter your email";
  } else {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        notify2.innerText = "Password Reset Email Send Check Your Inbox";
      })
      .then((err) => {
        console.log(err);
      });
  }
}

const forget_link = document.querySelector("#forget_link");
forget_link.addEventListener("click", showForgetPasswordForm);

const forget_btn = document.querySelector("#forget_btn");
forget_btn.addEventListener("click", forgetPassword);
