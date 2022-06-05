import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  canvasPushToUndo,
  canvasSet,
  canvasSetSessionId,
  canvasSetSocket,
  canvasSetUsername,
} from "../redux/slices/canvasSlice";
import { useParams } from "react-router-dom";
import { toolSet } from "../redux/slices/toolsSlice";
import "../scss/canvas.scss";
import Brush from "../tools/Brush";
import Modal from "./Modal/Modal";
import Rect from "../tools/Rect";
import axios from "axios";
import Line from "../tools/Line";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";

const Canvas = () => {
  const canvasRef = useRef();
  const userRef = useRef();

  const dispatch = useDispatch();
  const canvasRedo = useSelector((state) => state.canvas.canvasRedo);
  const username = useSelector((state) => state.canvas.username);

  const params = useParams(); // поулчаю парамсы чтобы в id передать сгенеренную дату переведенную в строку (см компонент App)
  const [modalActive, setModalActive] = useState(true);

  useEffect(() => {
    dispatch(canvasSet(canvasRef.current));
    let ctx = canvasRef.current.getContext("2d");
    axios
      .get(`http://localhost:5000/image?id=${params.id}`)
      .then((response) => {
        const img = new Image();
        img.src = response.data;
        img.onload = () => {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          ctx.drawImage(
            img,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          ctx.stroke(); // обводка
        };
      });
    console.log(canvasRedo);
  }, []);

  useEffect(() => {
    // соедениение по вебсокет протоколу

    if (username) {
      const socket = new WebSocket("ws://localhost:5000/"); // передать адрес на котором сервак пашет
      dispatch(canvasSetSocket(socket));
      dispatch(canvasSetSessionId(params.id));
      dispatch(toolSet(new Brush(canvasRef.current, socket, params.id)));
      socket.onopen = () => {
        // устанавливаю соеденение
        console.log("Соект пашет исправно");
        socket.send(
          JSON.stringify({
            id: params.id, // передаю id сессии из параметров
            username: username,
            method: "connection",
          })
        );
      };

      socket.onmessage = (e) => {
        let msg = JSON.parse(e.data);
        switch (msg.method) {
          case "connection":
            console.log(`Пользователь ${msg.username} присоеденился`);
            break;
          case "draw":
            drawHandler(msg);
            break;
          default:
            break;
        }
      };
    }
  }, [username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.stroke, figure.width);
        break;
      case "line":
        Line.drawStaticLine(
          ctx,
          figure.x,
          figure.y,
          figure.stroke,
          figure.strokeWidth,
          figure.megaX,
          figure.megaY
        );
        break;
      case "rect":
        Rect.drawStatic(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color,
          figure.stroke,
          figure.strokeWidth
        );
        break;

      case "circle":
        Circle.drawCircle(
          ctx,
          figure.x,
          figure.y,
          figure.r,
          figure.stroke,
          figure.strokeWidth
        );
          
        break;
      case "eraser":
        Eraser.drawEraser(ctx, figure.x, figure.y, "white", figure.width);
        break;
      case "finish":
        ctx.beginPath();
        break;

      default:
        break;
    }
  };

  const mouseUpHandler = async () => {
    dispatch(canvasPushToUndo(canvasRef.current.toDataURL())); // делаю снимок текущего канваса и добавляю его в состояние
    await axios
      .post(`http://localhost:5000/image?id=${params.id}`, {
        img: canvasRef.current.toDataURL(),
      })
      .then((res) => console.log(res.data));
  };

  const connectHandler = () => {
    dispatch(canvasSetUsername(userRef.current.value)); // достаю value из input и передаю в стор
    setModalActive(false);
  };

  return (
    <>
      <Modal active={modalActive} setActive={setModalActive}>
        <h2 className="modalTitle">Введите ваше имя</h2>
        <input ref={userRef} className="modalInput" type="text" name="" id="" />
        <button className="modalButton" onClick={() => connectHandler()}>
          Войти
        </button>
      </Modal>
      <div className="canvas">
        <canvas
          onMouseUp={() => mouseUpHandler()}
          ref={canvasRef}
          height={1000}
          width={1800}
        />
      </div>
    </>
  );
};

export default Canvas;
