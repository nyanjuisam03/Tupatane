import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';


function JoinGroup() {
  const [groups, setGroups] = useState([])
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsRef = collection(db, 'groups');
        const querySnapshot = await getDocs(groupsRef);
        const groupsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setGroups(groupsData);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);
  return (
    <div>
    <h2>Available Groups</h2>
      {groups.map((group) => (
        <div key={group.id} className="card w-96 bg-base-100 shadow-xl my-4">
          <div className="group-card p-4">
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <p>Niche: {group.niche}</p>
            <Link to={`/groups/${group.id}/${group.name}`} className="btn bg-orange-500">Join Chat</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default JoinGroup
