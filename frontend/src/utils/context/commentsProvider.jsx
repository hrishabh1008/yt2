import { useContext } from "react";
import { commentContext } from "./commentsContext";

export const CommentProvider = ({ children }) => {

    useContext(commentContext)


  return (
    <commentContext.Provider value={commentContext._currentValue}>
      {children}
    </commentContext.Provider>
  );
};