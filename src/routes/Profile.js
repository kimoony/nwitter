import React from 'react';
import { authService } from 'fBase';
import { useHistory } from 'react-router-dom';


function Profile() {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/")
  }

  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  )
}

export default Profile
