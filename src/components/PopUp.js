import PopUpThread from "./PopUpThread";
import ThreadInput from "./ThreadInput";

function PopUp({ user, setShowPopUp }) {
  return (
    <div className="popup">
      <p onClick={()=>setShowPopUp(false)}>X</p>
          <PopUpThread />
          <ThreadInput/>
    </div>
  );
}

export default PopUp;