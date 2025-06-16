import { useState } from "react";
import Navbar from "../components/Navbar";
import UserTable from "../components/UserTable";

const HomePage = () => {
  const [search, setSearch] = useState("");

  return (
    <>
    <div>
      <Navbar search={search} setSearch={setSearch} />
    </div>
     <UserTable search={search} /> 
     </>
  );
};

export default HomePage;
