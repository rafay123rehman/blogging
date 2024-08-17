import {
    auth,
    storage,
    db,
    signOut,
    getDoc,
    doc,
    onAuthStateChanged,
    getDocs,
    collection,
    updateDoc,
    arrayUnion,
    arrayRemove,
  } from "./utils/utils.js";
  
  console.log("auth==>",auth);
  
  const logout_btn = document.getElementById("logout_btn");
  const login_link = document.getElementById("login_link");
  const user_img = document.getElementById("user_img");
  const myevents_btn = document.getElementById("myevents_btn");
  const create_event_btn = document.getElementById("create_event_btn");
  
  const events_cards_container = document.getElementById(
    "events_cards_container"
  );
  getAllEvents();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      login_link.style.display = "none";
      user_img.style.display = "inline-block";
      logout_btn.style.display = "inline-block";
      myevents_btn.style.display = "inline-block";
      create_event_btn.style.display = "inline-block";
  
      getUserInfo(uid);
      // ...
    } else {
      login_link.style.display = "inline-block";
      user_img.style.display = "none";
      logout_btn.style.display = "none";
      myevents_btn.style.display = "none";
      create_event_btn.style.display = "none";
    }
  });
  
  logout_btn.addEventListener("click", () => {
    signOut(auth);
  });
  
  function getUserInfo(uid) {
    const userRef = doc(db, "users", uid);
    getDoc(userRef).then((data) => {
      console.log("data==>", data.id);
      console.log("data==>", data.data());
      user_img.src = data.data()?.img;
    });
  }
 
  