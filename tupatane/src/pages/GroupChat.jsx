import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from '../firebase';
import { LuSend } from "react-icons/lu";
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { FaVideo } from "react-icons/fa6";

const GroupChat = () => {
  const { groupId, groupName } = useParams();
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState('');

  const messagesRef = collection(db, 'groups', groupId, 'messages'); // Scoped to group's messages subcollection
  const q = query(messagesRef, orderBy('createdAt'));
  const [messages] = useCollectionData(q, { idField: 'id' });

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    });
    setMessage('');
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex  justify-between bg-orange-500/75 p-4'>
        <h1 className='text-2xl'>{groupName}</h1> {/* Display the group name */}
        <div className="tooltip tooltip-left " data-tip="Video Call" >
        <FaVideo  className='text-2xl my-2'/>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto p-4'>
        {messages && messages.map(msg => (
          <div key={msg.id} className='flex items-center p-2'>
            <img src={msg.photoURL} alt={msg.displayName} className='w-8 h-8 rounded-full mr-2' />
            <div>
              <div className='font-bold'>{msg.displayName}</div>
              <div>{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className='p-4 flex'>
        <input
          className='input input-bordered flex-1 mr-2'
          placeholder='Enter your chat'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className='btn' type='submit'><LuSend className='text-xl' /></button>
      </form>
    </div>
  );
};

export default GroupChat;
