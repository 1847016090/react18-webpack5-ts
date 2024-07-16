import React, { useState } from "react";
import ClassComponent from "./components/Class";

import smallImg from "./assets/imgs/5kb.png";
import bigImg from "./assets/imgs/22kb.png";

import "./app.less";

function App() {
  const [count, setCounts] = useState("");
  const onChange = (e: any) => {
    setCounts(e.target.value);
  };
  return (
    <>
      <h2>webpack5-react-ts修改1111</h2>
      <ClassComponent />
      <img src={smallImg} alt="小于10kb的图片" />
      <img src={bigImg} alt="大于于10kb的图片" />
      <div className="smallImg"></div> {/* 小图片背景容器 */}
      <div className="bigImg"></div> {/* 大图片背景容器 */}
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />
    </>
  );
}
export default App;
