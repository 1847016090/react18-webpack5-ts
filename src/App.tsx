import React from "react";
import "./app.less";
import ClassComponent from "./components/Class";

import smallImg from "./assets/imgs/5kb.png";
import bigImg from "./assets/imgs/22kb.png";

function App() {
  return (
    <>
      <h2>webpack5-react-ts</h2>
      <ClassComponent />
      <img src={smallImg} alt="小于10kb的图片" />
      <img src={bigImg} alt="大于于10kb的图片" />
      <div className="smallImg"></div> {/* 小图片背景容器 */}
      <div className="bigImg"></div> {/* 大图片背景容器 */}
    </>
  );
}
export default App;
