import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Auth/AuthContext';

const Profile = () => {
  const { getProfile } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getProfile((newProfile, newError) => {
      setProfile(newProfile);
      setError(newError);
    });
  }, [getProfile]);

  if (!profile) {
    return null;
  }

  if (error) {
    return (
      <div>{ error }</div>
    );
  }

  return (
    <>
      <h1>Profile</h1>
      <p>{profile.nickname}</p>
      <img
        style={{ maxWidth: 50, maxHeight: 50 }}
        src={profile.picture}
        alt="profile pic"
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
};

Profile.propTypes = {
};

export default Profile;
