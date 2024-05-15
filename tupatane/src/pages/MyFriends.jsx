import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const MyFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const friendsList = userData.friends || [];
          setFriends(friendsList);
        }
      } catch (err) {
        setError('Failed to load friends.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Friends</h2>
      {friends.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {friends.map(friend => (
            <div key={friend.id} className="card w-full bg-base-100 shadow-xl p-4">
              <h3 className="text-center font-bold">{friend.name}</h3>
             <button className='btn bg-orange-500 text-white'>Chat</button>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no friends added yet.</p>
      )}
    </div>
  );
};

export default MyFriends;
