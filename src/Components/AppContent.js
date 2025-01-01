import axios from "axios";
import React, { useState } from "react";
import style from "../styles/modules/app.module.scss";
import GetList from "./GetList";

const AppContent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/contacts", {
        name,
        phone,
        email,
      });
      console.log(response.data);

      setNewPost(response.data);
    } catch (err) {
      setError("Error adding the post");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className={style.newPost}>loading...</p>;
  if (error) return <p className={style.newPost}>{error}</p>;

  return (
    <div>
      <form className={style.title} onSubmit={handleSubmit}>
        <div>
          <label for="Name">Name:</label>
          <input
            type="text"
            id="Name"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={style.input}
          />
        </div>
        <div>
          <label for="Phone">Phone No:</label>
          <input
            type="tel"
            id="Phone"
            placeholder="123-456-7890"
            required
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={style.input}
          />
        </div>
        <div>
          <label for="Email">Email:</label>
          <input
            type="email"
            id="Email"
            placeholder="steeve.sticks@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.input}
          />
        </div>
        <div className={style.container}>
          <button type="submit" className={style.button}>
            Create
          </button>
          <GetList />
        </div>
      </form>
      {newPost && (
        <div className={style.newPost}>
          <h2>CONTACT ADDED:</h2>
          <p>
            <strong>NAME: </strong> {newPost.name}
          </p>
          <p>
            <strong>PHONE NO: </strong> {newPost.phone}
          </p>
          <p>
            <strong>EMAIL: </strong> {newPost.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default AppContent;
