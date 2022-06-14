import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas,socket,id) {
    super(canvas,socket,id);
    this.listen();
    this.type = 'brush' // полсе создания объекта канвас будет сразу слушать все функции
    this.strokeColor = 'black'
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false; // когда мышка не зажата
    if (!this.mouseDown) {
      this.socket.send(JSON.stringify({ // отправляю на сервер чтобы участники сессии могли увидеть рисунок
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
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop) // получаю коррдинаты курсора мыши чтобы отрисовать ее поведение
  }

  mouseMoveHandler(e) {
      
    if (this.mouseDown) {
      this.socket.send(JSON.stringify({
        method:'draw',
        id:this.id,
        figure: {
          type: this.type,
          x:e.pageX - e.target.offsetLeft ,
          y:e.pageY - e.target.offsetTop ,
          stroke: this.ctx.strokeStyle,
          width: this.ctx.lineWidth  
        }
      }))
    }
  }

  static draw (ctx,x,y,stroke,width){ 
    ctx.strokeStyle = 'black'
    ctx.strokeStyle = stroke
    ctx.lineWidth = width
    ctx.lineTo(x,y)
    ctx.stroke() 
    
  }
}
