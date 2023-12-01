import PopUpThread from "./PopUpThread";
import ThreadInput from "./ThreadInput";

function PopUp( { user, setShowPopUp, currentThread, setCurrentThread } ) {

  return (
    <div className="popup">
      <p onClick={()=>setShowPopUp(false)}>X</p>
          <PopUpThread />
      <ThreadInput currentThread={ currentThread } setCurrentThread={setCurrentThread} />
    </div>
  );
}

export default PopUp;