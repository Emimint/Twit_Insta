function ThreadInput({ user, textThread, setTextThread, postNewThread }) {


  return (
      <>
      <p>{ user.handle}</p>
        <input placeholder="What's on your mind?" value={textThread} onChange={e=>setTextThread(e.target.value)}></input>
        <button className="primary" onClick={postNewThread}>Post</button>
      </>
    );
}

export default ThreadInput;