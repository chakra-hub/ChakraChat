import { React, useEffect, useState, useRef } from "react";
import "./App.css";
import Message from "./components/Message";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "./firebase";

const auth = new getAuth(app);
const db = new getFirestore(app);

const signInHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
};

const signOutHandler = () => {
  signOut(auth);
};

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sorted_query = query(
    collection(db, "Messages"),
    orderBy("createdAt", "asc")
  );

  const divForScroll = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        url: user.photoURL,
        createdAt: serverTimestamp(),
      });
      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {setUser(data)});

      const unsubscribeOnSnapshot = onSnapshot(sorted_query, (snap) => {
        setMessages(
          snap.docs.map((item) => {
            const id = item.id;
            return { id, ...item.data() };
          })
        );
      });

      return () => {
        unsubscribe();
        unsubscribeOnSnapshot();
      };
    },[]);

  return (
    <>
      {user ? (
        <div className="chat_container">
          <div className="all_item_container">
            <div className="logout_container">
              <button id="logout_btn" onClick={signOutHandler}>
                Logout
              </button>
            </div>

            <div className="chat_box">
              {messages.map((item) => (
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text={item.text}
                  uri={item.url}
                />
              ))}
              <div ref={divForScroll}></div>
            </div>

            <form onSubmit={submitHandler} className="message_container">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="message_box"
                type="text"
                placeholder="Enter Message..."
              />
              <button className="send_btn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="signin_container">
          <button className="signin_btn" onClick={signInHandler}>
            Sign in with Google
          </button>
        </div>
      )}
    </>
  );
}

export default App;
