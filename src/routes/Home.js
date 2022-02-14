import React, { useState, useEffect } from 'react';
import { dbService } from 'fBase';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import 'styles/Home.css';

function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr)
    });
  }, []);


  return (
    <div className='home-container'>
      <NweetFactory userObj={userObj} />
      <div className='home-content'>
        {
          nweets.map((nweet) => (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Home
