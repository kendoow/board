import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas,socket,id) {
        super(canvas,socket,id);
        this.type = 'eraser'
    }


   static drawEraser(ctx,x, y,color,width) {
       super.draw(ctx,x,y,color,width)
    }
}