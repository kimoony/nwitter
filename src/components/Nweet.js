import { dbService, storageService } from 'fBase';
import React, { useState, useCallback } from 'react';
import 'styles/Nweet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'




const Nweet = ({ nweetObj, isOwner }) => {

  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text)

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제할까요??");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  }

  const toggleEditing = () => setEditing(prev => !prev)

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    })
    setEditing(false)
  }

  const onChange = (e) => {
    const {
      target: { value }
    } = e;
    setNewNweet(value)
  }

  return (
    <>
      {nweetObj.attachmentUrl && <img className="nweet-img" src={nweetObj.attachmentUrl} width="350px" height="350px" />}
      <div className="nweet-container">
        {
          editing ? (
            <>
              <form id="nweet-form" onSubmit={onSubmit}>
                <div>
                  <input
                    className="nweet-input"
                    type="text"
                    placeholder="Nweet 수정하기"
                    value={newNweet}
                    required
                    onChange={onChange} />
                </div>
                <input className="btn nweet-update-btn" type="submit" value="Update Nweet" />
              </form>
              <button className="btn nweet-cansle-btn" onClick={toggleEditing}>취소</button>
            </>
          ) : (
            <div className="nweet-content">
              <div className="nweet-text">
                <h4>{nweetObj.text}</h4>
              </div>
              {isOwner && (
                <div className='btn-box'>
                  <button className="btn edit-btn" onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button className="btn del-btn" onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              )}
              {/* <span>{new Date().toLocaleString()}</span> */}
            </div>
          )
        }
      </div>
    </>
  );
}

export default Nweet;
