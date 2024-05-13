import React, { useState, useEffect } from 'react';
import { db,auth } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const MyGroups = () => {
    const [groups, setGroups] = useState([]);
    const userId = auth.currentUser.uid;
  
    useEffect(() => {
      const fetchGroups = async () => {
        const groupsRef = collection(db, 'groups');
        const q = query(groupsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const groupsData = querySnapshot.docs.map((doc) => doc.data());
        setGroups(groupsData);
      };
  
      fetchGroups();
    }, [userId]);
  
  return (
    <div>
       <h2>My Groups</h2>
      {groups.map((group) => (
        <>
        <div className="card w-96 bg-base-100 shadow-xl my-4">
        <div key={group.id} className="group-card">
          <h3>{group.name}</h3>
          <p>{group.description}</p>
          <p>Niche: {group.niche}</p>
        </div>
        </div>
        </>
      ))}
      
    </div>
  )
}

export default MyGroups
