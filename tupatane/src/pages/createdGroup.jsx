import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreatedGroup = () => {
  const [groupData, setGroupData] = useState({
    groupName: "",
    description: "",
    niche: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid; 

    try {
      const groupRef = collection(db, 'groups');
      const newGroup = {
        name: groupData.groupName,
        description: groupData.description,
        niche: groupData.niche,
        userId: userId,
      };
      const docRef = await addDoc(groupRef, newGroup);
      console.log('Group added successfully');

      navigate(`/groups/${docRef.id}/${groupData.groupName}`);
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create your group</h2>
          <span>Your Group Name</span>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name='groupName' value={groupData.groupName} onChange={handleChange} />
          <span>Your Group Niche (Art, Sport, Gaming, and others)</span>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name='niche' value={groupData.niche} onChange={handleChange} />
          <span>Your Description</span>
          <textarea className="textarea textarea-bordered" placeholder="Bio" name='description' value={groupData.description} onChange={handleChange}></textarea>
          <div className="card-actions justify-end">
            <button className="btn bg-orange-500 text-white" onClick={handleSubmit}>Create the Group</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedGroup;
