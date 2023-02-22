import React, { useState } from "react";
import { Rate } from "antd";

import "./Stars.css";

const Stars = ({ like, id, rating }) => {
  const [valueLike, setValueLike] = useState();

  const onChange = (value) => {
    like(value, id);
    setValueLike(value);
  };

  return <Rate allowHalf defaultValue={0} value={rating || valueLike} count={10} onChange={onChange} />;
};

export default Stars;
