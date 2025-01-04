import axios from "axios";
import React, { useState } from "react";
import style from "../styles/modules/app.module.scss";
import images from "../images/delete.png";
import edit from "../images/edit.png";
import toast from "react-hot-toast";

const GetList = () => {
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [editingid, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");

  const fetchPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:5000/contacts");
      // console.log(response.data);
      setNewPost(response.data);
      // console.log(newPost);
    } catch (err) {
      toast.error("Error adding the post");
    } finally {
      setLoading(false);
    }
  };

  const [err, setErr] = useState("");
  const [load, setLoad] = useState(false);

  const handleEdit = async (post) => {
    console.log(post);
    setToggleModal(true);
    setEmail(post.email);
    setContacts(post.phone);
    setName(post.name);
    setEditingId(post._id);

    document.body.style.overflow = "hidden";
  };

  const editFunction = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/contacts/${editingid}`,
        {
          name,
          phone: contacts,
          email,
        }
      );
      setNewPost((prevData) =>
        prevData.map((item) => (item._id === editingid ? response.data : item))
      );

      // console.log(response.data);
      setToggleModal(false);
      toast.success("Contact Updated Sucessfully");

      document.body.style.overflow = "auto";

      if (name === "") {
        toast.error("Please fill the name ");
        return;
      }
      if (contacts === "") {
        toast.error("Please fill the contacts");
        return;
      }
      if (email === "") {
        toast.error("Please fill the email");
        return;
      }
    } catch (err) {
      toast.error("Error adding the post");
    } finally {
      setLoad(false);
    }
  };

  const handleDelete = (post) => {
    setId(post._id);
    deleteItem(post._id);
  };

  const deleteItem = async (deleteId) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${deleteId}`);
      setNewPost((prevData) =>
        prevData.filter((item) => item._id !== deleteId)
      );
      toast.success("Contact deleted successfully");
    } catch (error) {
      // toast.error("Error deleting the contact");
    }
  };

  if (message) return <p className={style.newPost}>{message}</p>;
  if (error) return <p className={style.newPost}>{error}</p>;

  return (
    <div>
      <div>
        <button onClick={fetchPost} className={style.button}>
          Read
        </button>
      </div>
      {toggleModal && (
        <div className={style.overlay}>
          <div className={style.formBorder}>
            <form className={style.form}>
              <h1 className={style.name}>Update CONTACTS</h1>
              <label htmlFor="title">
                Name
                <input
                  type="text"
                  id="title"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                Phone No
                <input
                  type="text"
                  id="title"
                  autoFocus
                  value={contacts}
                  onChange={(e) => setContacts(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                Email
                <input
                  type="text"
                  id="title"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <div className={style.buttonHeader}>
                <button
                  className={style.updateButton}
                  type="submit"
                  onClick={() => {
                    setToggleModal(false);
                    editFunction();
                  }}
                >
                  Update task
                </button>
                <button
                  className={style.cancelButton}
                  onClick={() => {
                    setToggleModal(false);

                    document.body.style.overflow = "auto";
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ul>
        {newPost &&
          newPost.map((post) => (
            <li key={post.id}>
              <div className={style.image}>
                <div>
                  <img
                    src={images}
                    className={style.delete}
                    alt="delete"
                    onClick={() => {
                      handleDelete(post);
                      deleteItem();
                    }}
                  />
                </div>
                <div>
                  <img
                    src={edit}
                    className={style.edit}
                    alt="edit"
                    onClick={() => handleEdit(post)}
                  />
                </div>
              </div>

              <div className={style.post}>
                <strong>Name:</strong> {post.name} <br />
                <strong>Phone No:</strong> {post.phone}
                <br />
                <strong>Email:</strong> {post.email}
                <br />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GetList;
