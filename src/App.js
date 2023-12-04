import { useState, useEffect } from "react";
import React from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";
import WriteIcon from "./components/WriteIcon";

// Comments from Rob

function App() {
  const [ user, setUser ] = useState( null );
  const [ threads, setThreads ] = useState( null );
  const [ viewThreadFeed, setViewThreadFeed ] = useState( true );
  const [ filteredThreads, setFilteredThreads ] = useState( null );
  const [ showPopUp, setShowPopUp ] = useState( false );
  const [ currentThread, setCurrentThread ] = useState( null );
  const [ replyThreads, setReplyThreads ] = useState( null );
  const [textThread, setTextThread ] = useState( null );

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

  const getReplies = async () => {
    try {
      const response = await fetch(`http://localhost:3000/threads?reply_to=${currentThread?.id}`);
      const data = await response.json();
      setReplyThreads(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const postNewThread = async () => { 

    const newThread = {
    "timestamp": new Date(),
    "thread_from": user.id,
    "thread_to": currentThread?.id || null,
    "reply_to": currentThread?.id || null,
    "text": textThread,
    "likes": []
  };

    try {
      const response = await fetch( "http://localhost:3000/threads"
        , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {...newThread}),
      });
      const data = await response.json();
      console.log( data );
      getThreads();
      getReplies();
      setTextThread("");
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    setCurrentThread( null );
    setViewThreadFeed(null);
    setShowPopUp(true);
  }


    useEffect(() => {
    getReplies();
    }, [currentThread] );

  useEffect(() => {
    getUser();
    getThreads();
  }, [] );

    useEffect(() => {
      getThreadFeed();
  }, [user, threads, viewThreadFeed] );
  
  console.log(replyThreads);

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
            setCurrentThread={ setCurrentThread }
          />
          { showPopUp && <PopUp 
            user={ user }
            setShowPopUp={ setShowPopUp }
            replyThreads={ replyThreads }
            textThread={ textThread }
            setTextThread={ setTextThread }
            postNewThread={ postNewThread }
          /> }
          <div onClick={handleClick}>
            <WriteIcon />
          </div>
        </div>
      }
  </>
  );
}

export default App;
