import './ProfilePage.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


const ProfilePage = ({ loginToken, handleLogout }) => {
  const [profileData, setProfileData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const fetchProfileData = useCallback(async () => {
    try {
      const response = await axios.get('https://storebh.bhaaraterp.com/api/my-profile/', {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      console.log(response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [loginToken]);

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchProfileData();
    };
    fetchProfile();
  }, [fetchProfileData]);

  const updateProfile = async () => {
    try {
      const response = await axios.post(
        'https://storebh.bhaaraterp.com/api/update-profile/',
        {
          first_name: firstName,
          last_name: lastName,
          email,
          gender,
          date_of_birth: dateOfBirth,
          profile_picture: profilePicture,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Profile Data</h3>
      <pre>{JSON.stringify(profileData, null, 2)}</pre>

      <h3>Update Profile</h3>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <input
        type="text"
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
      />
      <input
        type="text"
        placeholder="Profile Picture"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
      />
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
};

export default ProfilePage;
