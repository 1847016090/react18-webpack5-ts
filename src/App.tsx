import React, { Suspense, lazy, useState } from "react";
import ClassComponent from "@/components/Class";

import smallImg from "@/assets/imgs/5kb.png";
import bigImg from "@/assets/imgs/22kb.png";

import { Demo1, Demo2 } from "@/components";

const LazyDemo = lazy(() => import("@/components/LazyDemo")); // 使用import语法配合react的Lazy动态引入资源

import "@/app.less";

function App() {
  const [count, setCounts] = useState("");
  const [show, setShow] = useState(false);
  const onChange = (e: any) => {
    setCounts(e.target.value);
  };
  // 点击事件中动态引入css, 设置show为true
  const onClick = () => {
    // import("./app.css");
    setShow(true);
  };
  console.log("111", 111);
  return (
    <>
      <h2 onClick={onClick}>展示</h2>
      {/* show为true时加载LazyDemo组件 */}
      {show && (
        <Suspense fallback={null}>
          <LazyDemo />
        </Suspense>
      )}
      <h2>webpack5-react-ts修改1111</h2>
      <ClassComponent />
      <img src={smallImg} alt="小于10kb的图片" />
      <img src={bigImg} alt="大于于10kb的图片" />
      <div className="smallImg"></div> {/* 小图片背景容器 */}
      <div className="bigImg"></div> {/* 大图片背景容器 */}
      <h2>组件</h2>
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />
      <Demo1 />
    </>
  );
}
export default App;
