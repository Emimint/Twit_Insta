import { useState, useEffect } from "react";
import React from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";
import WriteIcon from "./components/WriteIcon";

// Comments from Rob
// In general you need to work on the readability of the code. Everything is starting at the App.js. 
// Usually you don't have much specific logic in the app.js and this structure will not be able to scale
// with more developers. Ie this App.js file will become a few hundred lines of code with more functionality.


function App() {
  const [ user, setUser ] = useState( null );
  const [ threads, setThreads ] = useState( null );
  const [ viewThreadFeed, setViewThreadFeed ] = useState( true );
  const [ filteredThreads, setFilteredThreads ] = useState( null );
  const [ showPopUp, setShowPopUp ] = useState( false );
  const [ currentThread, setCurrentThread ] = useState( null );
  const [ replyThreads, setReplyThreads ] = useState( null );
  const [textThread, setTextThread ] = useState( null );

  // this needs to be an env variable or in a constants file
  const userId = "1";

  // this needs to be in an api file
  // this should be called getUserData
  const getUser = async () => { 
    try {
      // your api calls later will not be fetching from localhost. When you make your api file you should keep that in mind.
      // production mode and a development mode
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`);
      const data = await response.json();
      setUser(data[0]);
    }
    catch (error) {
      console.log(error);
    }
  }
  // this needs to be in an api file
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

  // Ideally you shouldn't rely on the states to do your functions. It should take in arguments and return the values
  function getThreadFeed() {
    if ( viewThreadFeed ) {
      const standardThreads = threads?.filter( ( thread ) => thread.reply_to === null );
      setFilteredThreads( standardThreads );
    } else { 
      const replyThreads = threads?.filter( ( thread ) => thread.reply_to!== null );
      setFilteredThreads( replyThreads );
    }
  }

  // this needs to be in an api file
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
  // this needs to be in an api file
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

  // in reality you should prepare for different users. If userId changes then you need to refetch the data
  useEffect(() => {
    getUser();
    getThreads();
  }, [] );

    useEffect(() => {
      getThreadFeed();
  }, [user, threads, viewThreadFeed] );
  
  // remove console logs
  console.log(replyThreads);

  return (
  <>
  {/* what happens when there is no user? What happens if any of your API's throw an error? */}
      { user &&
      // Ideally you shouldn't need to pass in props like this to your components. You should access them from the components that needs it from your API file
      // or you could use a store like redux or zustand
        <div className="app">
          {/* for example in this layout, a clean way to do it is if you have all the component without the props.
          You only care about how the layout is placed at this level but right now all the logic is mixed in so that it is trying to do many things at once. */}
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
