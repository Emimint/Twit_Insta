function Header() {
  return (
      <header>
          <div className="info-container">
              <div className="user-info-container">
                  <h1>username</h1>
                  <p>handle
                      <span className="threads-info">Thread.coom</span>
                  </p>
              </div>
              <div className="img-container">
                  <img src="" alt="profile-pic"/>
              </div>
          </div>
          <p>
              bio
          </p>
          <div className="sub-info-container">
              <p className="sub-text">X followers ⋆ <a href="">link</a></p>
          </div>
          <button
              className="primary"
          onClick={()=>navigator.clipboard.writeText('I am a url!')}
          >
              Share profile
          </button>
          <div className="button-container">
              <button>Threads</button>
              <button>Replies</button>
          </div>
    </header>
  );
}

export default Header;