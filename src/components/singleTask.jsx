import { useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { TbStatusChange } from "react-icons/tb";

function SingleTask({ single, setTasks,setTasksCopy }) {
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState("");
  const inputRef = useRef(null);

  // function to handle Edit Value of task
  const handleSubmit = () => {
    if (edit.trim()) {
      setTasks((prev) => {
        return prev.map((item) => {
          if (item.id === single.id) {
            return { ...item, todo: edit };
          }

          return item;
        });
      });
// make channges in taskCopy List also
       setTasksCopy((prev) => {
        return prev.map((item) => {
          if (item.id === single.id) {
            return { ...item, todo: edit };
          }

          return item;
        });
      });

      setIsEdit(false);
    } else alert("Please enter text");
  };

  // for marking complete incomplete the task
  const handleComplete = () => {
   
    setTasks((prev) => {
      return prev.map((item) => {
        if (item.id === single.id) {
          return { ...item, isDone: !item.isDone };
        }

        return item;
      });
    });

     setTasksCopy((prev) => {
      return prev.map((item) => {
        if (item.id === single.id) {
          return { ...item, isDone: !item.isDone };
        }

        return item;
      });
    });

    setIsEdit(false);
  };

  // Deleting the task
  const handleDelete = () => {
    
    setTasks((prev) => {
      return prev.filter((item) => item.id !== single.id);
    });

    setTasksCopy((prev) => {
      return prev.filter((item) => item.id !== single.id);
    });
  };

  return (
    
    <div className="singleTask">
      {/*------------------- Task display div --------------------------------------------------- */}
      <div>
        {isEdit ? (
          <input
            className="singleSpan singleSpanIp"
            ref={inputRef}
            type="text"
            onChange={(e) => setEdit(e.target.value)}
            value={edit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          />
        ) : (
          <span className={`singleSpan ${single.isDone && "completed"}`}>
            {single.todo}
          </span>
        )}
      </div>
{/*------------------------------------ Finish By , Status , Actions div--------------------------------------- */}
      <div className="inner1">
        <p className="pTag">
          Finish By :{" "}
          <span className={`sp`} style={{ color: "rgb(139, 11, 11)" }}>
            {single.date}
          </span>
        </p>
        <p className="pTag">
          Status :{" "}
          <span className={`sp status ${single.isDone && "completedSp"}`}>
            {single.isDone ? "Completed" : "Pending"}
          </span>
        </p>
        <div className="icons">
          {single?.isDone === false &&
            (isEdit ? (
              <TbStatusChange size={25} onClick={handleSubmit} />
            ) : (
              <AiFillEdit
                size={25}
                onClick={(event) => {
                  setIsEdit(!isEdit);
                  inputRef.current?.focus();
                  setEdit(single.todo);
                }}
              />
            ))}

          <MdDelete size={25} onClick={handleDelete} />
          {isEdit || (
            <TiTick
              className={`${single.isDone && "completed-icon"}`}
              size={25}
              onClick={handleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleTask;
