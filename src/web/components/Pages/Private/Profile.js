import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Profile = ({ auth }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    auth.getProfile((newProfile, newError) => {
      setProfile(newProfile);
      setError(newError);
    });
  });

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
  auth: PropTypes.shape({
    getProfile: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
