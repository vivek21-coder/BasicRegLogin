# BasicRegLogin
you need to setup additional firebaseDb.js file in PROJECT_ROOT/database folder as follows

```
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "___",
  authDomain: "___",
  databaseURL: "___",
  projectId: "___",
  storageBucket: "___",
  messagingSenderId: "___",
  appId: "___",
  measurementId: "___"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
```
