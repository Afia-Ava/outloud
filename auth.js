function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function signup(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function logout() {
  return firebase.auth().signOut();
}

function onAuthStateChanged(callback) {
  firebase.auth().onAuthStateChanged(callback);
}
