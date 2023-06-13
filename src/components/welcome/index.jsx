import React, { useState } from "react";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import "./index.css";
const Welcome = () => {
  const x = "hcyvu";
  const auth = useAuth();

  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [inputvalue, setinputvalue] = useState("");
  const [load, setload] = useState(false);

  const Handlelogout = () => {
    auth.Logout();
    navigate("/");
  };
  const handlecomplete = (e) => {
    const duplist = [...list];
    duplist[e].status = true;
    setList(duplist);
  };
  const handlecancel = (e) => {
    const duplist = [...list];
    duplist[e].isedited = false;
    setList(duplist);
  };

  const handleadd = () => {
    const newobl = {
      taskname: inputvalue,
      status: false,
      isedited: false,
      editedvalue: inputvalue,
    };
    const newarray = [...list, newobl];
    setList(newarray);
    setinputvalue("");
  };

  const handledelete = (e) => {
    setload(true);
    setList(list.filter((i) => i.taskname !== e));
    setload(false);
  };
  console.log(list);
  const handleeditbtn = (e) => {
    const duplist = [...list];
    duplist[e].isedited = true;
    setList(duplist);
  };
  const editinput = (e, index) => {
    const duplist = [...list];
    duplist[index].editedvalue = e;
    setList(duplist);
  };
  const handlesave = (e, val) => {
    const duplist = [...list];
    duplist[e].taskname = val;
    duplist[e].isedited = false;
    setList(duplist);
  };

  return (
    <div>
      {" "}
      roshan {x}
      <div>
        <button
          type="button"
          onClick={() => {
            Handlelogout();
          }}
        >
          Logout
        </button>
      </div>
      <div className="main">
        <div>
          <p>Todo List </p>
          <div>
            <input
              type="text"
              value={inputvalue}
              onChange={(e) => {
                setinputvalue(e.target.value);
              }}
            />{" "}
            <button type="button" onClick={handleadd}>
              Add
            </button>
          </div>
        </div>
        <div>
          {list.map((i, enm) => (
            <div className="tasklist" key={enm}>
              {i.isedited ? (
                <input
                  type="text"
                  value={i.editedvalue}
                  onChange={(e) => {
                    editinput(e.target.value, enm);
                  }}
                />
              ) : (
                <p>{i.taskname}</p>
              )}
              <div>
                {i.isedited ? (
                  <div>
                    <button
                      onClick={() => {
                        handlecancel(enm);
                      }}
                    >
                      cancel
                    </button>
                    <button
                      onClick={() => {
                        handlesave(enm, i.editedvalue);
                      }}
                    >
                      save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleeditbtn(enm);
                    }}
                  >
                    edit
                  </button>
                )}

                {!i.status ? (
                  <button
                    type="button"
                    onClick={() => {
                      handlecomplete(enm);
                    }}
                  >
                    completed
                  </button>
                ) : null}

                <button
                  onClick={() => {
                    handledelete(i.taskname);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Welcome;
