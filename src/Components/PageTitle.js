import React from "react";
import style from "../styles/modules/title.module.scss";
import AppContent from "./AppContent";
import DeleteList from "./DeleteList";
const PageTitle = ({ children }) => {
  return (
    <div>
      <p className={style.title}>{children}</p>
      <AppContent />
      {/* <DeleteList /> */}
    </div>
  );
};

export default PageTitle;
