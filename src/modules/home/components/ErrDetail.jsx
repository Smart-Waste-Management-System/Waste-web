import React from "react";

const ErrDetail = ({ response }) => {
    if (!response) return null;
  
    return (
      <div
        className={`mt-4 p-4 border ${
          response.success
            ? "border-green-500 text-green-500"
            : "border-red-500 text-red-500"
        }`}
      >
        <p>{response.message}</p>
      </div>
    );
  };
  
  export default React.memo(ErrDetail);
  