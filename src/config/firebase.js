import {initializeApp} from "firebase/app"
import {getMessaging} from "firebase/messaging"

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export {messaging}
