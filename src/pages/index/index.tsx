import { useEffect, useRef } from "react";
import { View, Canvas } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import lottie from "lottie-miniprogram";
// import lottieAniamte from "./lottie-animate.json";
import lottieAniamte from "./heart-icon.json"
// import Dropdown from "@/components/Dropdown";
import "./index.scss";

export default function Index() {
  const ref = useRef<any>();
  useLoad(() => {
    console.log("Page loaded.");
  });

  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query
      .select("#EXISAHFSFSDSDFHI")
      .node((res) => {
        console.log("res", res);
        setTimeout(() => {
          const canvas = res.node;
          // canvas.width = 300
          // canvas.height = 300
          const context = canvas.getContext("2d");
          lottie.setup(canvas);
          ref.current = lottie.loadAnimation({
            loop: false,
            autoplay: false,
            animationData: lottieAniamte,
            // path: "https://lottie.host/b7533b80-b243-42eb-9274-c3550e019893/NTrZ9BFZEA.json", // 动画文件路径
            rendererSettings: {
              context,
            },
          });
        }, 300)

      })
      .exec();
  }, []);

  return (
    <View className='index'>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        type='2d'
        canvasId='EXISAHFSFSDSDFHI'
        id='EXISAHFSFSDSDFHI'
        onClick={() => {
          ref.current.goToAndPlay(0, true);
        }}
      />
    </View>
  );
}
