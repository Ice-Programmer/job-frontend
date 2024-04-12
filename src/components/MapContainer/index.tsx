import React, { useEffect } from "react";
import styles from "./index.css";
import AMapLoader from "@amap/amap-jsapi-loader";

interface Props {
  coordinateX: number;
  coordinateY: number;
  name: string;
}

const MapContainer: React.FC<Props> = (props) => {
  let map: any = null;

  const { coordinateX, coordinateY, name } = props;

  useEffect(() => {
    AMapLoader.load({
      key: "2ba67791ef42c9f7cf8ffcd4046923e2", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 15, // 初始化地图级别
          center: [coordinateX, coordinateY], // 初始化地图中心点位置
          // dragEnable: false
        });
        const marker = new AMap.Marker({
          position: new AMap.LngLat(coordinateX, coordinateY), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: name,
        });
        map.add(marker);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, []);

  return (
    <div
      id="container"
      className={styles.container}
      style={{ height: "170px", borderRadius: 12 }}
    ></div>
  );
}

export default MapContainer;
