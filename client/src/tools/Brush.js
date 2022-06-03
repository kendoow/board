import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas,socket,id) {
    super(canvas,socket,id);
    this.listen(); // полсе создания объекта канвас будет сразу слушать все функции
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false; // когда мышка не зажата
    if (!this.mouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop ); // соответсвтенно сам рисунок
      this.socket.send(JSON.stringify({
        method:'draw',
        id:this.id,
        figure: {
          type: "finish"
        }
      }))
    }
  }

  mouseDownHandler(e) {
    this.mouseDown = true; // мышка зажата 
    this.ctx.beginPath()
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop) // получаю коррдинаты курсора мыши чтобы отрисовать ее поведение
  }

  mouseMoveHandler(e) {
      
    if (this.mouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop ); // соответсвтенно сам рисунок
      this.socket.send(JSON.stringify({
        method:'draw',
        id:this.id,
        figure: {
          type: 'brush',
          x:e.pageX - e.target.offsetLeft ,
          y:e.pageY - e.target.offsetTop ,
        }
      }))
    }
  }

  static draw (ctx,x,y){
    ctx.strokeStyle = "black"
    ctx.lineTo(x,y) // у 2д элментов в канвасе есть свойство line to и stroke соотвественно 
    ctx.stroke() 

  }
}
