import { React, useEffect, useState } from "react";
import "./home.css"
import Navbar from  '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from "../../components/list/List"
import axios from "axios"

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmEzODNhZTVhMmQ5ZWM1NzNlMTE3NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMTA2ODkxOCwiZXhwIjoxNzExNTAwOTE4fQ.ISmVgbal69mQL1waoo7gyTEc4s5tXo-H2S6vz2Izvi4"
              ,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
}

export default Home
