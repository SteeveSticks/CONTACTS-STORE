import React, { useState } from "react";
import axios from "axios";
import style from "../styles/modules/app.module.scss";
import images from "../images/delete.png";

const DeleteList = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState(null);
  const [editingid, setEditingId] = useState(null);
  const [id, setId] = useState("");

  const deleteItem = async (post) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/contacts/${editingid}`,
        {
          message,
        }
        // setNewPost(response.data)
      );

      setNewPost((prevData) =>
        prevData.filter((post) => post._id !== editingid)
      );
      console.log(newPost);

      // console.log(response.data);
    } catch (err) {
      setError("Error adding the post");
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <p className={style.newPost}>loading...</p>;
  // if (error) return <p className={style.newPost}>{error}</p>;

  return (
    <div>
      <button
        className={style.cancelButton}
        onClick={() => {
          deleteItem();
        }}
      >
        <div>
          <img src={images} className={style.delete} alt="delete" />
        </div>
      </button>

      <ul>
        {newPost &&
          newPost.map((post) => (
            <li>
              <strong>Message:</strong> {post.message}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DeleteList;
