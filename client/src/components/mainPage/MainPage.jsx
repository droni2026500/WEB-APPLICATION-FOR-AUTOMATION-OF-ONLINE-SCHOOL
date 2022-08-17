import React from "react";
import { observer } from "mobx-react-lite";
import photo from "./photo.jpg";

function MainPage() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>Полина Мальцева</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={photo} alt="photo"
             style={{
            borderRadius: "100px" /* Радиус скругления */,
            border: "3px" /* Параметры рамки */,
            boxShadow: "0 0 7px #666" /* Параметры тени */,
        }}/>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3>Ведущий эксперт в теме школьного образования</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          whiteSpace: "pre-line",
        }}
      >
        {"Помогаю родителям и школам выстраивать траекторию обучения и развития детей" +
          "\n\n— Руководила проектом создания школы «Летово»" +
          "\n— Возглавляю социальную инфраструктуру г. Доброград, в котором в 2021 была открыта школа «Мир»" +
          "\n— Работала в Департаменте образования г. Сан-Франциско" +
          "\n— Имею 4 высших образования, в том числе Harvard Business School (MBA)"}
      </div>
    </div>
  );
}

export default observer(MainPage);
