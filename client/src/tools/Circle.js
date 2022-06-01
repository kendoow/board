import Tool from "./Tool";

export default class Circle extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen(); // полсе создания объекта канвас будет сразу слушать все функции
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false; // когда мышка не зажата
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
      let width = currentX - this.startX; // где находится мышка - начальная позиция
      let height = currentY - this.startY;

      let r = Math.sqrt(width**2 + height**2)
      this.draw(this.startX, this.startY, r) // соответсвтенно сам рисунок круга, его координаты
    }
  }

  draw(x, y, r) {
    const img = new Image(); // объект изображения
    img.src = this.saved; // передаю в переменную изображение с канваса
    // функция отрабатывает когда значение установилось
    img.onload = async () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // отчистка канваса от нарисованных фигур
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height); // возвращаем старые рисунки 
      this.ctx.beginPath(); // говорим что начинаем рисовать новую фигуру
      this.ctx.arc(x, y, r, 0, 2*Math.PI)
      this.ctx.stroke(); // обводка
    };
  }
}
