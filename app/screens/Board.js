import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function Board({ route }) {
  const { userName } = route.params; // Retrieve userName passed from Home.js
  const [formValue, setFormValue] = useState('');
  const ref = useRef();
  const [messages, setMessages] = useState([]);

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => {
        const firebaseData = doc.data();

        // Safeguard against missing fields
        const createdAt = firebaseData.createdAt?.toDate() || new Date();

        return {
          _id: doc.id,
          text: firebaseData.text || "", // Fallback to an empty string if text is missing
          createdAt,
          userName: firebaseData.userName || "Unknown", // Fallback userName
        };
      });

      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  // Send message to Firestore
  const sendMessage = async () => {
    const messageSent = collection(db, "messages");
    await addDoc(messageSent, {
      text: formValue,
      createdAt: serverTimestamp(), // Firestore server timestamp
      userName, // Use the userName passed from Home.js
    });

    setFormValue('');
    ref.current.scrollToEnd({ animated: true });
  };

  return (
    <KeyboardAvoidingView
      style={styles.chatContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90} // Adjust offset for your header height
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <ScrollView
            style={styles.messageContainer}
            ref={ref}
            onContentSizeChange={() => ref.current.scrollToEnd({ animated: true })}
          >
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={formValue}
              onChangeText={(text) => setFormValue(text)}
              placeholder="Type Message Here"
            />
            <Button title="Send" onPress={sendMessage} disabled={!formValue} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

function ChatMessage({ message }) {
  const { text, userName, createdAt } = message;
  
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(createdAt);

  // elaine + katerina small change testing: making text messages blue
  return (
    <View style={styles.message}>
        <Text>
          <Text style={styles.userName}>{userName}</Text>: 
          <Text style={styles.messageText}>{text}</Text>
        </Text>
        <Text style={styles.timestamp}>{formattedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 2,
  },
  innerContainer: {
    flex: 2,
  },
  messageContainer: {
    flex: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingBottom: 20, 
    
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 8,
    marginRight: 10,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 20
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderRadius: 20,
    alignItems: 'flex-start',
  },
  messageText: {
    color: 'blue',    // elaine + katerina small change in testing: making text messages blue
  },
  userName: {
    fontWeight: 'bold', // Makes the name bold
  },
  timestamp: {
    marginLeft: 30,
    fontSize: 12,
    color: 'gray',
  },
});