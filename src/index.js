import { initializeApp } from 'firebase/app'
import { 
   getFirestore, collection , getDocs,
   addDoc, deleteDoc, doc,
} from 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyAeAtScnk6zMys6JrJJoNK-uUypm9VNJ5Y",
  
    authDomain: "boombox-c956b.firebaseapp.com",
  
    projectId: "boombox-c956b",
  
    storageBucket: "boombox-c956b.appspot.com",
  
    messagingSenderId: "640367834187",
  
    appId: "1:640367834187:web:131d815260e4ae93ee49ce"
  
  };

// Initialize Firebase
initializeApp(firebaseConfig);

//init services
const db = getFirestore()

//collection reference
const colRef = collection(db, 'books')

//get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err.message)
  })


//   adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    
    })
    .then(() => {
        addBookForm.reset()
    })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})
