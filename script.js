const modal = document.getElementById("booking-modal");
const btn = document.getElementById("book-now-btn");
const span = document.getElementsByClassName("close-modal")[0];
const form = document.getElementById('booking-form');

btn.onclick = function() {
  modal.style.display = "block";
  setTimeout(() => {
    modal.style.opacity = 1;
  }, 50);
}

span.onclick = function() {
  modal.style.opacity = 0;
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.opacity = 0;
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const contact = document.getElementById('contact').value;
  const email = document.getElementById('email').value;
  const facebookLink = document.getElementById('facebook').value;

 
  if (facebookLink && !facebookLink.startsWith('https://www.facebook.com/')) {
    alert("Please enter a valid Facebook link starting with 'https://www.facebook.com/'");
    return; 
  }

  // Firebase Integration Realtime Database
  const firebaseConfig = {
    apiKey: "AIzaSyBslUr-lb1HcCxz4jGzGN1tk-l8EwOdjec", 
    authDomain: "projectx-website-3312b.firebaseapp.com", 
    databaseURL: "https://projectx-website-3312b-default-rtdb.asia-southeast1.firebasedatabase.app", 
    projectId: "projectx-website-3312b", 
    storageBucket: "projectx-website-3312b.firebasestorage.app", 
    messagingSenderId: "1086959626150", 
    appId: "1:1086959626150:web:4be9d4820e133ec9e75167" 

  };

  try {
    firebase.initializeApp(firebaseConfig); 
  } catch (error) {
    console.error("Firebase initialization error:", error);
    alert("Error initializing Firebase. Please check your configuration.");
    return; 
  }

  const database = firebase.database();

  const newAppointmentRef = database.ref('appointments').push();

  newAppointmentRef.child('Name').set(name)
    .then(() => {
      return newAppointmentRef.child('Address').set(address);
    })
    .then(() => {
      return newAppointmentRef.child('Contact').set(contact);
    })
    .then(() => {
      return newAppointmentRef.child('Email').set(email);
    })
    .then(() => {
      return newAppointmentRef.child('Facebook').set(facebookLink);
    })
    .then(() => {
      alert('Appointment Booked!');
      modal.style.opacity = 0;
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
      form.reset();
    })
    .catch((error) => {
      console.error("Error saving appointment:", error);
      alert('Error saving appointment: ' + error.message);
    });
});