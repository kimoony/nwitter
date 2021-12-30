import React, { useState, useEffect } from 'react'
import { dbService } from 'fBase';

function Home() {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach(document => {
      const nweetsObj = {
        ...document.data(),
        id: document.id
      }
      setNweets(prev => [nweetsObj, ...prev]);
    })
  }

  useEffect(() => {
    getNweets();
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      nweet,
      createAt: Date.now(),
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

  console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
