import React, { useState } from 'react'
import { dbService, storageService } from 'fBase';
import { v4 as uuidv4 } from 'uuid';
import 'styles/NweetFactory.css';


function NweetFactory({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

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
    <div className="n_f-container">
      <form id="n_f-form" onSubmit={onSubmit}>
        <input
          className="n_f-input"
          type="text"
          placeholder="당신의 생각을 적어주세요!"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input className="n_f-file" type="file" accept="image/*" onChange={onFileChange} />
        <input className="btn n_f-btn" type="submit" value="Nweet" />
        {
          attachment &&
          <div className="preview">
            <img className="n_f-img" src={attachment} width="100px" height="100px" />
            <button className="btn n_f-cancle" onClick={onClearFileClick}>업로드 취소</button>
          </div>
        }
      </form>
    </div>
  )
}

export default NweetFactory