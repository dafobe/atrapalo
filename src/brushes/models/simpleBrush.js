import {default as Brush} from './brush';

const BRUSH_WIDTH = 3;
const BRUSH_COLOR = '#000000';

const colors = {type: 'strokeStyle',
                label: 'Brush Color',
                values: ['#00CC99', '#000000']}

const sizes = { type: 'lineWidth', 
                label: 'Brush Size',
                values: [1, 5, 10, 15]}

const defaultAllowedStyles = [colors, sizes];


export default class SimpleBrush extends Brush{
  constructor (container, name = 'simpleBrush', stylesStore = defaultAllowedStyles, onSelectBrush, onPaint) {
    super(container, name, stylesStore, onSelectBrush);

    this.lineWidth = BRUSH_WIDTH;
    this.strokeStyle = BRUSH_COLOR;

    this.lineJoin = 'round';
    this.lineCap = 'round';


  }

  /*
    Hooks to implement by customized brushes
  */
  paint(context, position){
console.log('Brush Paint', context, position, this);

    super.paint(context, position);
    context.moveTo(position.x, position.y)
    context.lineTo(position.x, position.y);
    //context.closePath();
    //context.stroke();
  }
  
  startPaint(context, position){ 
    super.startPaint(context, position);
    context.beginPath();
    context.moveTo(position.x, position.y);

    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.strokeStyle;
    context.lineJoin = this.lineJoin;
    context.lineCap = this.lineCap;

    /*context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;*/
  }

  stopPaint(context){
    super.stopPaint(context);
    context.closePath();
    context.stroke();
  }
}