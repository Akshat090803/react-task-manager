import { useEffect, useRef, useState } from "react";
import SingleTask from "./singleTask";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";
import { formatDateToDDMMYYYY } from "./inputField";
import EmptyList from "./EmptyList";

function TaskList({ tasks, setTasks, newTaskBool, setNewTaskBool }) {
  const [tasksCopy, setTasksCopy] = useState(tasks);

  //!-----------------------------------Filter functionalty---------------------------------------------------
  const [filterMode, setFilterMode] = useState(false);
  const [filterType, setFiltertype] = useState("");
  const filterButtonRef = useRef(null); // Ref for the button
  const filterMenuRef = useRef(null); // Ref for the menu

  const handleFilter = (criteria) => {
    let today;
    switch (criteria) {
      case "all":
        setFiltertype("All Tasks");
        setTasksCopy([...tasks]);
        break;
      case "pending":
        setFiltertype("Pending Tasks");
        setTasksCopy(() => tasks.filter((item) => item.isDone === false));
        break;
      case "completed":
        setFiltertype("Completed Tasks");
        setTasksCopy(() => tasks.filter((item) => item.isDone === true));
        break;
      case "createdToday":
        setFiltertype("Tasks Created Today");
        today = formatDateToDDMMYYYY(new Date());
        setTasksCopy(
          tasks.filter((item) => {
            // item.id is a timestamp (number), convert it to a Date object first
            const creationDate = new Date(item.id);
            return formatDateToDDMMYYYY(creationDate) === today;
          })
        );
        break;
      case "dueToday":
        setFiltertype("Tasks Due Today");
        today = formatDateToDDMMYYYY(new Date());
        setTasksCopy(() => tasks.filter((item) => item.date === today));
        break;
      default:
        setTasksCopy([...tasks]);
        break;
    }
  };

  // ! -------------------------------Sort MOde--------------------------------------------------------------

  const [sortMode, setSortMode] = useState(false);
  const sortButtonRef = useRef(null); // Ref for the button
  const sortMenuRef = useRef(null); // Ref for the menu
  const [sortOrder, setSortOrder] = useState("");

  // Function to handle Sort
  const handleSort = (order) => {
    let sortedTasks = [...tasksCopy]; // Always sort the currently displayed tasks (tasksCopy)

    switch (order) {
      case "Oldest First (Created Date)":
        sortedTasks.sort((a, b) => a.id - b.id); // Ascending Order based on creation
        break;
      case "Newest First (Created Date)":
        sortedTasks.sort((a, b) => b.id - a.id); // 'Descending order Based on creation
        break;
      case "Soonest Due (Due Date)":
        sortedTasks.sort((a, b) => {
          const datePartsA = a.date.split("/");

          const dateA = new Date(
            datePartsA[2],
            datePartsA[1] - 1,
            datePartsA[0]
          );

          const datePartsB = b.date.split("/");
          const dateB = new Date(
            datePartsB[2],
            datePartsB[1] - 1,
            datePartsB[0]
          );

          return dateA.getTime() - dateB.getTime(); // Ascending order
        });
        break;

      case "Latest Due (Due Date)":
        sortedTasks.sort((a, b) => {
          const datePartsA = a.date.split("/");
          const dateA = new Date(
            datePartsA[2],
            datePartsA[1] - 1,
            datePartsA[0]
          );

          const datePartsB = b.date.split("/");
          const dateB = new Date(
            datePartsB[2],
            datePartsB[1] - 1,
            datePartsB[0]
          );

          return dateB.getTime() - dateA.getTime(); // Descending order
        });
        break;

      default:
        break;
    }
    setTasksCopy(sortedTasks); // Update TasksCopy state
    setSortOrder(order); // Update the sort order message
  };

  // !Use Effect to handle outside click for filter and sort menu modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Sort", sortMenuRef, sortButtonRef, filterMenuRef);
      if (
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target) &&
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        setFilterMode(false);
      }
      if (
        // Changed from else if to if
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target) &&
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target)
      ) {
        setSortMode(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // updating TaskCopy whenever a new Task Added
  useEffect(() => {
    if (newTaskBool) {
      setTasksCopy(tasks);
      setNewTaskBool(false);
    }
  }, [newTaskBool]);

  // If 0 tasks, return this
  if (!tasks || tasks.length === 0) {
    return <EmptyList />;
  }

  return (
    <>
      {/*----------------------------------------- Buttons for Sort and Switch----------------------------------- */}
      <div className="functionality">
        <button
          ref={sortButtonRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onClick={() => setSortMode((prev) => !prev)}
        >
          Sort{" "}
          <span>
            <FaSortAmountDown size={18} />
          </span>
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          ref={filterButtonRef}
          onClick={() => setFilterMode((prev) => !prev)}
        >
          Filter <FaFilter className="icon" size={18} />
        </button>
      </div>

      {/* ---------------------------------Menu for Filter options------------------------------------------*/}
      <ul
        ref={filterMenuRef}
        style={{
          zIndex: filterMode ? 100 : 0,
          opacity: filterMode ? 1 : 0,
          display: filterMode ? "block" : "none",
        }}
      >
        <button onClick={() => setFilterMode((prev) => !prev)}>X</button>
        <li
          onClick={() => {
            handleFilter("all");
            setFilterMode(false);
          }}
        >
          All Tasks
        </li>
        <li
          onClick={() => {
            handleFilter("pending");
            setFilterMode(false);
          }}
        >
          Pending
        </li>
        <li
          onClick={() => {
            handleFilter("completed");
            setFilterMode(false);
          }}
        >
          Completed
        </li>
        <li
          onClick={() => {
            handleFilter("createdToday");
            setFilterMode(false);
          }}
        >
          Created Today
        </li>
        <li
          onClick={() => {
            handleFilter("dueToday");
            setFilterMode(false);
          }}
        >
          Due Today
        </li>
      </ul>

      {/*----------------------------------------- Menu for Sort options-------------------------------------- */}
      <ul
        ref={sortMenuRef}
        style={{
          zIndex: sortMode ? 100 : 0,
          opacity: sortMode ? 1 : 0,
          display: sortMode ? "block" : "none",
        }}
      >
        <button
          onClick={(e) => {
            setSortMode((prev) => !prev);
          }}
        >
          X
        </button>
        <li
          onClick={() => {
            handleSort("Oldest First (Created Date)");
            setSortMode(false);
          }}
        >
          Oldest First (Created Date)
        </li>
        <li
          onClick={() => {
            handleSort("Newest First (Created Date)");
            setSortMode(false);
          }}
        >
          Newest First (Created Date)
        </li>
        <li
          onClick={() => {
            handleSort("Soonest Due (Due Date)");
            setSortMode(false);
          }}
        >
          Soonest Due (Due Date)
        </li>
        <li
          onClick={() => {
            handleSort("Latest Due (Due Date)");
            setSortMode(false);
          }}
        >
          Latest Due (Due Date)
        </li>
      </ul>

      {/*-------------------------------------------- Rendering the taskLists------------------------------------- */}
      {filterType && !sortOrder ? (
        <span className="functionalitySpan">{`🐥 Showing ${
          tasksCopy ? tasksCopy.length : 0
        } out of ${tasks ? tasks.length : 0} tasks ( ${filterType} ) 🐥`}</span>
      ) : sortOrder ? (
        filterType ? (
          <span className="functionalitySpan">{`🐥 Showing ${
            tasksCopy ? tasksCopy.length : 0
          } out of ${
            tasks ? tasks.length : 0
          } tasks ( ${filterType} ) & Sorted by - ${sortOrder} 🐥`}</span>
        ) : (
          <span className="functionalitySpan">{`🐥 Sorted by - ${sortOrder} 🐥`}</span>
        )
      ) : (
        ""
      )}
      <div
        style={{
          opacity: filterMode || sortMode ? 0.3 : 1,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div className="taskList">
          {tasksCopy &&
            tasksCopy.map((single) => {
              return (
                <SingleTask
                  single={single}
                  setTasks={setTasks}
                  setTasksCopy={setTasksCopy}
                  key={single.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default TaskList;
