import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAix04IwsX3-HK7igZxHO43RH0kXh-ijFw",
  authDomain: "vue-chat-80a0b.firebaseapp.com",
  databaseURL: "https://vue-chat-80a0b.firebaseio.com",
  projectId: "vue-chat-80a0b",
  storageBucket: "vue-chat-80a0b.appspot.com",
  messagingSenderId: "796520685741"
};
const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({timestampsInSnapshots: true})

export default firebaseApp.firestore()
