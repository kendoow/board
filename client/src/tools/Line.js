import Tool from "./Tool";

export default class Line extends Tool {
  constructor(canvas, socket, id) {
    super(canvas,socket,id);
    this.listen();
    this.name = "Line";
    this.strokeColor = 'black'
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }


  mouseUpHandler() {
    this.mouseDown = false;
    this.ctx.beginPath()
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "line",
          x: this.startX,
          y: this.startY,
          megaX:this.megaX,
          megaY:this.megaY,
          stroke: this.ctx.strokeStyle,
          strokeWidth: this.ctx.lineWidth
        },
      })
    );
  }
  
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    console.log(this.startX,this.startX)
    this.saved = this.canvas.toDataURL();
  }

 

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.megaX = e.pageX - e.target.offsetLeft
      this.megaY = e.pageY - e.target.offsetTop
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x, y) {
    const img = new Image();
    img.src = this.saved;
    img.onload =  () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      console.log(this)
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }

  static drawStaticLine(ctx, x, y, color,width, megaX, megaY) {
    console.log(ctx, x, y, color,width)
    ctx.strokeStyle = color;
    ctx.lineWidth = width
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(megaX, megaY);
    ctx.stroke();
    ctx.beginPath();
  }
}
