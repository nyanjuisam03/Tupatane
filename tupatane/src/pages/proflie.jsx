import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';

function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    bio: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const fetchProfileData = async () => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    const profileRef = collection(db, 'profiles');
    const q = query(profileRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const profile = querySnapshot.docs[0].data();
      setProfileData(profile);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    try {
      const profileRef = collection(db, 'profiles');
      const newProfile = {
        ...profileData,
        userId: user.uid,
      };
      await addDoc(profileRef, newProfile);
      console.log('Profile added successfully');
      setSubmitted(true);
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  if (!auth.currentUser) {
    return (
      <div>
        <h2>Please log in to create your profile.</h2>
      </div>
    );
  }

  return (
    <div>
      {submitted ? (
        <div className="card w-96 bg-base-100 shadow-xl mx-12 my-12">
          <div className="card-body">
            <h2 className="card-title">Your Profile</h2>
            <p>First Name: {profileData.firstName}</p>
            <p>Last Name: {profileData.lastName}</p>
            <p>Username: {profileData.userName}</p>
            <p>Bio: {profileData.bio}</p>
          </div>
        </div>
      ) : (
        <div className="card w-96 bg-base-100 shadow-xl mx-12 my-12">
          <div className="card-body">
            <h2 className="card-title">Create Your Profile</h2>
            <form onSubmit={handleSubmit}>
              <span>First Name</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
              />
              <span>Last Name</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
              />
              <span>Create your username</span>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  name="userName"
                  value={profileData.userName}
                  onChange={handleChange}
                />
              </label>
              <span>Your Bio</span>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Bio"
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
              ></textarea>
              <div className="card-actions justify-end">
                <button className="btn bg-orange-500">Create your profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
