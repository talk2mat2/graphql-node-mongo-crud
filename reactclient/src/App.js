import logo from "./logo.svg";
import React from "react";

import { useQuery, useMutation } from "@apollo/client";
import { getAllusers, getlocalhost, addUser } from "./queries";

function App() {
  const [name, setname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [age, setage] = React.useState("");
  const { loading, error, data, refetch } = useQuery(getAllusers);
  const [addU] = useMutation(addUser);

  const addUsers = (e) => {
    e.preventDefault();

    Promise.resolve(
      addU({
        variables: {
          email,
          age,
          name,
        },
      })
    ).then(refetch());
    setemail("");
    setname("");
    setage("");
  };
  return (
    <div className="container ">
      <div className="bg-white h-400 rounded p-6 mt-50 text-center">
        {loading ? (
          <h2>loading...</h2>
        ) : error ? (
          <p>error occured</p>
        ) : (
          <ul>
            {data?.allUsers?.map((user) => (
              <li>{user.name}</li>
            ))}
          </ul>
        )}
        <form onSubmit={addUsers}>
          <input
            onChange={(e) => setname(e.target.value)}
            value={name}
            placeholder="name"
          />
          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            type="text"
            placeholder="email"
          />
          <input
            onChange={(e) => setage(e.target.value)}
            value={age}
            type="text"
            placeholder="age"
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
