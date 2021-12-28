import React from 'react';
import { authService } from 'fBase';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/")
  }

  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  )
}

export default Profile
