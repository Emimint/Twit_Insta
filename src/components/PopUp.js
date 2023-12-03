import PopUpThread from "./PopUpThread";
import ThreadInput from "./ThreadInput";

function PopUp( {user, replyThreads, setShowPopUp, textThread,setTextThread, postNewThread } ) {

  return (
    <div className="popup">
      <p onClick={ () => setShowPopUp( false ) }>X</p>
      { replyThreads?.map(  thread => 
        <PopUpThread
          key={ thread.id }
          thread={ thread } 
        />
      ) 
      }
      <ThreadInput
        user={ user }
        textThread={ textThread }
        setTextThread={ setTextThread }
        postNewThread={ postNewThread }
      />
    </div>
  );
}

export default PopUp;