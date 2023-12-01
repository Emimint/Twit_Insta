import { useRef } from "react";

function ThreadInput({setCurrentThread}) {

  const inputVal = useRef( "" );

  async function postNewThread() {
    currentThread.text = inputVal.current.value;

      try {
        const response = await fetch(`http://localhost:3000/threads/${currentThread.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentThread),
        });
        const data = await response.json();
        getThreads();
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <p></p>
      <input placeholder="What's on your mind?" ref={inputVal}></input>
      <button className="primary" onClick={postNewThread}>Post</button>
    </>
  );
}

export default ThreadInput;