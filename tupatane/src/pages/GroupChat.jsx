import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from '../firebase';
import { LuSend } from "react-icons/lu";
import { collection, addDoc, serverTimestamp, query, orderBy, doc , updateDoc , arrayUnion ,getDoc ,setDoc } from 'firebase/firestore';
import { FaVideo } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const GroupChat = () => {
  const { groupId, groupName } = useParams();
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // State to manage the selected user for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal visibility
const navigate=useNavigate()
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

  const handleUserClick = (msg) => {
    if (msg.uid !== user.uid) { // Ensure the clicked user is not the current user
      setSelectedUser(msg);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleAddFriend = async () => {
    const userDocRef = doc(db, 'users', user.uid);
    const friendData = {
      id: selectedUser.uid,
      name: selectedUser.displayName
    };
    

    try {
      await updateDoc(userDocRef, {
        friends: arrayUnion(friendData)
      });
    } catch (error) {
      if (error.code === 'not-found') {
        await setDoc(userDocRef, {
          friends: [friendData]
        });
      } else {
        console.error('Error updating document:', error);
      }
    }
    handleCloseModal();
  };



  const handlePrivateChat = async () => {
    if (selectedUser) {
      const privateChatRef = collection(db, 'privateChats');
      const privateChatDoc = await addDoc(privateChatRef, {
        members: [user.uid, selectedUser.uid],
        createdAt: serverTimestamp()
      });
      // Redirect to the private chat page
      navigate(`/private-chat/${privateChatDoc.id}`);
      handleCloseModal();
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex justify-between bg-orange-500/75 p-4'>
        <h1 className='text-2xl'>{groupName}</h1> {/* Display the group name */}
        <div className="tooltip tooltip-left" data-tip="Video Call">
          <FaVideo className='text-2xl my-2' />
        </div>
      </div>
      <div className='flex-1 overflow-y-auto p-4'>
        {messages && messages.map(msg => (
          <div key={msg.id} className={`flex items-center p-2 ${msg.uid === user.uid ? 'justify-end' : 'justify-start'}`}>
            {msg.uid !== user.uid && (
              <img
                src={msg.photoURL}
                alt={msg.displayName}
                className='w-8 h-8 rounded-full mr-2 cursor-pointer'
                onClick={() => handleUserClick(msg)}
              />
            )}
            <div className={`message ${msg.uid === user.uid ? 'message-right' : 'message-left'}`}>
              {msg.uid === user.uid ? (
                <>
                  <div>{msg.text}</div>
                </>
              ) : (
                <>
                  <div className='font-bold'>{msg.displayName}</div>
                  <div>{msg.text}</div>
                </>
              )}
            </div>
            {msg.uid === user.uid && (
              <img
                src={msg.photoURL}
                alt={msg.displayName}
                className='w-8 h-8 rounded-full ml-2 cursor-pointer'
                onClick={() => handleUserClick(msg)}
              />
            )}
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

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">User Options</h3>
            <p className="py-4">What would you like to do with {selectedUser?.displayName}?</p>
            <div className="modal-action">
              <button className="btn bg-orange-500 text-white" onClick={handleAddFriend}>Add as Friend</button>
              <button className="btn bg-orange-500 text-white" onClick={handlePrivateChat}>Start Private Chat</button>
              <button className="btn bg-orange-500 text-white" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChat;
