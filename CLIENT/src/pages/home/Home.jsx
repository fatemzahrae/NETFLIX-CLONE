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
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmEzODNhZTVhMmQ5ZWM1NzNlMTE3NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMTMyMzY4NiwiZXhwIjoxNzExNzU1Njg2fQ.J_FC5Q1tfCtyY-hzCsKdcMtli2s1I-8FhuHq2iwt4zY"
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
