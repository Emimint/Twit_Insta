import { useState, useEffect } from "react";
import moment from "moment";

function PopUpThread( { thread } ) {
  const [ user, setUser ] = useState( null );

   const timePassed = moment().startOf( "day" ).fromNow( thread.timestamp );

    const getUser = async () => { 
    try {
      const response = await fetch(`http://localhost:3000/users?id=${thread.thread_from}`);
      const data = await response.json();
      setUser(data[0]);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [] );
  
  return (
    <article className="feed-card">
      <div className="text-container">
        <div>
          <div className="img-container">
            <img src={ user?.img } alt="profile" />
          </div>
          <div>
            <p>
              <strong>{ user?.handle }</strong>
            </p>
            <p>{thread.text }</p>
          </div>
        </div>
        <p className="sub-text">{ timePassed}</p>
      </div>
    </article>
  );
}

export default PopUpThread;