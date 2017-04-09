import {default as Brush} from './brush';

const BRUSH_WIDTH = 3;
const BRUSH_COLOR = '#000000';

const colors = {type: 'strokeStyle',
                label: 'Brush Color',
                values: [ {value: '#000223', iconClass: 'brush-style-color brush-style-color--c1'}, 
                          {value: 'blue', iconClass: 'brush-style-color brush-style-color--blue'},
                          {value: 'black', iconClass: 'brush-style-color brush-style-color--black'}
                        ]}

const sizes = { type: 'lineWidth', 
                label: 'Brush Size',
                values: [{value: 1, iconText: 'S', sampleClass: 'brush-style-sample__size--s'},
                          {value: 5, iconText: 'M', sampleClass: 'brush-style-sample__size--m'},
                          {value: 10, iconText: 'L', sampleClass: 'brush-style-sample__size--l'},
                          {value: 15, iconText: 'XL', sampleClass: 'brush-style-sample__size--xl'}
                ]}

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
    //console.log('SimpleBrush Paint', context, position, this);

    super.paint(context, position);
    context.moveTo(position.x, position.y)
    context.lineTo(position.x, position.y);
    context.stroke();
    //context.closePath();
    //context.stroke();
  }
  
  startPaint(context, position){ 
    super.startPaint(context, position);
    
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.strokeStyle;
    context.lineJoin = this.lineJoin;
    context.lineCap = this.lineCap;

    context.beginPath();
    context.moveTo(position.x, position.y);
    context.stroke();

  }

  stopPaint(context){
    super.stopPaint(context);
    context.closePath();
  }

  getContextStyles(){
    const styles = {  lineWidth: this.lineWidth , 
                      strokeStyle: this.strokeStyle , 
                      lineJoin: this.lineJoin ,
                      lineCap: this.lineCap};
    
    return styles
  }
}