import { dbService } from 'fBase';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {

  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text)

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로??");
    console.log(ok)
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
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
    <div>
      {
        editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Nweet 수정하기"
                value={newNweet}
                required
                onChange={onChange} />
              <input type="submit" value="Update Nweet" />
            </form>
            <button onClick={toggleEditing}>취소</button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>삭제</button>
                <button onClick={toggleEditing}>수정</button>
              </>
            )}
          </>
        )
      }
    </div>
  );
}

export default Nweet;
