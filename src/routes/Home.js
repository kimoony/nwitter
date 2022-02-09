import React, { useState, useEffect } from 'react'
import { dbService } from 'fBase';
import Nweet from 'components/Nweet';

function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  }

  const onChange = (e) => {
    const {
      target: {
        value
      },
    } = e;
    setNweet(value);
  }
  // console.log(nweets);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="당신의 생각을 적어주세요!"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
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
