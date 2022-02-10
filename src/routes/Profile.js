import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fBase';
import { useHistory } from 'react-router-dom';


function Profile({ userObj, refreshUser }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/")
  }

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  }

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      })
    } refreshUser();
  }

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  )
}

export default Profile
