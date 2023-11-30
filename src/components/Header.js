function Header({user, viewThreadFeed, setViewThreadFeed}) {
  return (
      <header>
          <div className="info-container">
              <div className="user-info-container">
                  <h1>{user.username}</h1>
                  <p>{user.handle}
                      <span className="threads-info">TwitInsta.com</span>
                  </p>
              </div>
              <div className="img-container">
                  <img src={user.img} alt="profile-pic"/>
              </div>
          </div>
          <p>
              {user.bio}
          </p>
          <div className="sub-info-container">
              <p className="sub-text">{user.followers.length} followers ⋆ <a href={user.link} target="_blank">link</a></p>
          </div>
          <button
              className="primary"
          onClick={()=>navigator.clipboard.writeText('I am a url!')}
          >
              Share profile
          </button>
          <div className="button-container">
              <button className={viewThreadFeed && "current"} onClick={()=>setViewThreadFeed(true)}>Threads</button>
              <button className={!viewThreadFeed && "current"} onClick={()=>setViewThreadFeed(false)}>Replies</button>
          </div>
    </header>
  );
}

export default Header;