import React from "react";
import PageTitle from "./Components/PageTitle";
import style from "./styles/GlobalStyles.css";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  return (
    <div className="container">
      <PageTitle>CONTACT MANAGER</PageTitle>

      <Toaster richColors />
    </div>
  );
};

export default App;
