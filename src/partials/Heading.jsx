import React from "react";

function Heading({ headingValue }) {
  return (
    <h1 className="text-[48px] font-extrabold leading-10 text-gray-900">
      {headingValue}
    </h1>
  );
}

export default Heading;
