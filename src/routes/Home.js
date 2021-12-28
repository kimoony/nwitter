import React, { useState } from 'react'

function Home() {
  const [nweet, setNweet] = useState("")

  const onSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    const {
      target: {
        value
      },
    } = e;
    setNweet(value);
  }
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
    </div>
  )
}

export default Home
