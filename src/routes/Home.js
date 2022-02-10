import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fBase';
import Nweet from 'components/Nweet';

function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
  }

  const onChange = (e) => {
    const {
      target: {
        value
      },
    } = e;
    setNweet(value);
  }


  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onClearFileClick = () => setAttachment(null);


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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {
          attachment &&
          <div>
            <img src={attachment} alt="image" width="100px" height="100px" />
            <button onClick={onClearFileClick}>업로드 취소</button>
          </div>
        }
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
