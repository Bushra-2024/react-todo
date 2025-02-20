import { useState } from "react";
import "./App.css";
import first from "./assets/Ellipse 1.png";
import first2 from "./assets/Ellipse 2.png";
import first3 from "./assets/Ellipse 3.png";
import btnd from "./assets/DeleteFilled.png";
import btne from "./assets/EditFilled.png";
import searchicon from "./assets/Icon.png";
function App() {
  const intialData = [
    {
      id: 1,
      title: "The first task tittle",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet euismod nulla.",
      status: false,
    },
    {
      id: 2,
      title: "The second task tittle",
      description:
        "Lorem cosco dolor sit amet, consectetur adipiscing elit. Mauris sit amet euismod nulla.",
      status: false,
    },
    {
      id: 3,
      title: "The third task tittle",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet euismod nulla.",
      status: true,
    },
    {
      id: 4,
      title: "The fourth task tittle",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet euismod nulla.",
      status: true,
    },
  ];
  const [data, setData] = useState(intialData);
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [AddModal, SetAddModal] = useState(false);
  const [EditModal, SetEditModal] = useState(false);
  const [currentNote, SetcurrentNote] = useState(null);
  const [filter, SetFilter] = useState();
  const [search, SetSearch] = useState("");

  function openModal() {
    SetAddModal(true);
  }
  function closeModal() {
    SetAddModal(false);
    reset();
  }
  function reset() {
    SetTitle("");
    SetDescription("");
  }
  let saveNote = () => {
    let newOne = {
      id: Date.now(),
      title: title,
      description: description,
    };
    setData([...data, newOne]);
    reset();
    closeModal();
  };
  function editOpenModal(text) {
    SetEditModal(true);
    SetTitle(text.title);
    SetDescription(text.description);
    SetcurrentNote(text);
  }
  function editCloseModal() {
    SetEditModal(false);
    reset();
  }
  let updateUser = () => {
    setData(
      data.map((e) =>
        e.id == currentNote.id
          ? { ...e, title: title, description: description }
          : e
      )
    );
    reset()
    editCloseModal()
  };
  function deleteTask(id) {
    setData(data.filter((el) => el.id !== id));
  }
  function checkboxx(e) {
    let checkk = data.map((el) =>
      el.id === e.id ? { ...el, status: !el.status } : el
    );
    setData(checkk);
  }
  function filterIt(event) {
    let value = event.target.value;
    SetFilter(value);
    if (value == "All") {
      setData(intialData);
    } else if (value == "Done") {
      setData(intialData.filter((el) => el.status == true));
    } else if (value == "Not Done") {
      setData(intialData.filter((el) => el.status == false));
    }
  }
  //search
  let filterdata = data.filter((el) =>
    JSON.stringify(el).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="up">
        <h1>TODO</h1>
        <div className="secondUp">
          <div className="searchStyle">
            <input
              type="search"
              className="search"
              placeholder="Search here..."
              value={search}
              onChange={(e) => SetSearch(e.target.value)}
            />
            <img src={searchicon} />
            <img />
          </div>
          <select onChange={(event) => filterIt(event)} value={filter}>
            <option>All</option>
            <option>Done</option>
            <option>Not Done</option>
          </select>
          <h2 className="plus" onClick={() => openModal()}>+</h2>
        </div>
      </div>

      <div className="main">
        <aside>
          <div>
            <img src={first} />
            <strong>work</strong>
          </div>
          <div>
            <img src={first2} />
            <strong>study</strong>
          </div>
          <div>
            <img src={first3} />
            <strong>entertainment</strong>
          </div>
          <div>
            <img src={first2} />
            <strong>family</strong>
          </div>
          <div className="hide">
            <input type="checkbox" />
            <i>hide done task</i>
          </div>
        </aside>

        <div className="boxes">
          {filterdata.length > 0 ? (
            filterdata.map((e) => (
              <div className="box">
                <h3>{e.title}</h3>
                <p>{e.description}</p>
                <div className="secondDown">
                  <div>
                    <img src={btne} onClick={() => editOpenModal(e)}/>
                    <img src={btnd} onClick={() => deleteTask(e.id)} />
                  </div>
                  <div className="flex2">
                    <input
                      type="checkbox"
                      onChange={() => checkboxx(e)}
                      checked={e.status}
                    />

                    <p>{e.status ? "Done" : "Not Done"}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3 style={{ color: "red" }}>Not Found</h3>
          )}
        </div>
      </div>

      {AddModal && (
        <dialog open>
          <div className="modal">
            <h3>Task</h3>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => SetTitle(e.target.value)}
              placeholder="title"
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => SetDescription(e.target.value)}
              placeholder="description"
            />
            <div>
              <button onClick={saveNote} className="save">
                SaveNote
              </button>
              <button onClick={closeModal} className="cancel">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      {EditModal && (
        <dialog open>
          <div className="modal">
            <h3>Taskk</h3>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => SetTitle(e.target.value)}
              placeholder="title"
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => SetDescription(e.target.value)}
              placeholder="description"
            />
            <div>
              <button onClick={updateUser} className="save">
                SaveNote
              </button>
              <button onClick={editCloseModal} className="cancel">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default App;
