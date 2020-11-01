import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyBLbdUfBZ74nC1EAwdO1zmUNdZtl-nnG5k',
  authDomain: 'crwn-db-226aa.firebaseapp.com',
  databaseURL: 'https://crwn-db-226aa.firebaseio.com',
  projectId: 'crwn-db-226aa',
  storageBucket: 'crwn-db-226aa.appspot.com',
  messagingSenderId: '731974090675',
  appId: '1:731974090675:web:5411965b26d3328205d5c6',
  measurementId: 'G-5DBVVWYDD4',
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
