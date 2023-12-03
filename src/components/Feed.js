import Thread from "./Thread";

function Feed({ user, filteredThreads, setShowPopUp, getThreads, setCurrentThread}) {
  return (
    <div className="feed">
      { filteredThreads?.map( ( thread ) =>
        <Thread
          key={ thread.id }
          thread={ thread }
          user={ user }
          setShowPopUp={ setShowPopUp } 
          getThreads={ getThreads }
          setCurrentThread={ setCurrentThread }
          /> ) }
    </div>
  );
}

export default Feed;