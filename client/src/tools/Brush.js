import Tool from "./Tool";

export default class Brush extends Tool {
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
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop) // получаю коррдинаты курсора мыши чтобы отрисовать ее поведение
  }

  mouseMoveHandler(e) {
      
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop ); // соответсвтенно сам рисунок
    }
  }

  draw (x,y){
    this.ctx.lineTo(x,y) // у 2д элментов в канвасе есть свойство line to и stroke соотвественно 
    this.ctx.stroke() 

  }
}
