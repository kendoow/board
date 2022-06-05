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
    this.ctx.beginPath();
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
          stroke: this.ctx.strokeStyle, 
          strokeWidth: this.ctx.lineWidth
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
      this.ctx.beginPath();
      this.draw(this.startX, this.startY, this.width, this.height); // соответсвтенно сам рисунок квадрата, его координаты
    }
  }

  draw(x, y, w, h) {
    const img = new Image(); 
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

  static drawStatic(ctx, x, y, w, h,color,stroke,width) { // без перезатирания рисунка 
    console.log(this.startX, this.startY)
    ctx.fillStyle = color
    ctx.lineWidth = width
    ctx.strokeStyle = stroke
    ctx.beginPath(); 
    ctx.rect(x, y, w, h);
    ctx.fill(); 
    ctx.stroke(); 
    ctx.beginPath(); 
  }
}
