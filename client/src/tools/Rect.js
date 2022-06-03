import Tool from "./Tool";

export default class Rect extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen(); // полсе создания объекта канвас будет сразу слушать все функции
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "rect",
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          color: this.ctx.fillStyle,
        },
      })
    );
  }

  mouseDownHandler(e) {
    this.mouseDown = true; // мышка зажата
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.width = currentX - this.startX; // где находится мышка - начальная позиция
      this.height = currentY - this.startY;

      this.draw(this.startX, this.startY, this.width, this.height); // соответсвтенно сам рисунок квадрата, его координаты
    }
  }

  draw(x, y, w, h) {
    this.ctx.strokeStyle = "black";
    const img = new Image(); // объект изображения
    img.src = this.saved; // передаю в переменную изображение с канваса
    // функция отрабатывает когда значение установилось
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // отчистка канваса от нарисованных фигур
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height); // возвращаем старые рисунки
      this.ctx.beginPath(); // говорим что начинаем рисовать новую фигуру
      this.ctx.rect(x, y, w, h);
      this.ctx.fill(); // заполнение
      this.ctx.stroke(); // обводка
    };
  }

  static drawStatic(ctx, x, y, w, h) {
    ctx.beginPath(); // говорим что начинаем рисовать новую фигуру
    ctx.rect(x, y, w, h);
    ctx.fill(); // заполнение
    ctx.stroke(); // обводка
  }
}
