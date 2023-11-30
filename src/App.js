import { useState, useEffect } from "react";
import React from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";
import WriteIcon from "./components/WriteIcon";

function App() {
  const [ user, setUser ] = useState( null );
  const [ threads, setThreads ] = useState( null );
  const [ viewThreadFeed, setViewThreadFeed ] = useState( true );
  const [ filteredThreads, setFilteredThreads ] = useState( null );
  const [ showPopUp, setShowPopUp ] = useState( false );

  const userId = "1";

  const getUser = async () => { 
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`);
      const data = await response.json();
      setUser(data[0]);
    }
    catch (error) {
      console.log(error);
    }
  }

  const getThreads = async () => { 
    try {
      const response = await fetch(`http://localhost:3000/threads?thread_from=${userId}`);
      const data = await response.json();
      setThreads(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  function getThreadFeed() {
    if ( viewThreadFeed ) {
      const standardThreads = threads?.filter( ( thread ) => thread.reply_to === null );
      setFilteredThreads( standardThreads );
    } else { 
      const replyThreads = threads?.filter( ( thread ) => thread.reply_to!== null );
      setFilteredThreads( replyThreads );
    }
  }

  useEffect(() => {
    getUser();
    getThreads();
  }, [] );

    useEffect(() => {
      getThreadFeed();
  }, [user, threads, viewThreadFeed] );
  
  console.log(filteredThreads);

  return (
  <>
      { user &&
        <div className="app">
          <Nav url={user.instagram_url} />
          <Header 
            user={ user } 
            viewThreadFeed={ viewThreadFeed }
            setViewThreadFeed={setViewThreadFeed}
          />
          <Feed
            user={ user }
            filteredThreads={ filteredThreads }
            setShowPopUp={ setShowPopUp }
            getThreads={ getThreads }
          />
          { showPopUp && <PopUp 
            user={ user }
            setShowPopUp={setShowPopUp}
          /> }
          <div onClick={()=>setShowPopUp(true)}>
            <WriteIcon />
          </div>
        </div>
      }
  </>
  );
}

export default App;
