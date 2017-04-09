import {default as Brush} from './brush';

const BRUSH_WIDTH = 3;
const BRUSH_COLOR = '#000000';

const colors = {type: 'strokeStyle',
                label: 'Brush Color',
                values: [ {value: '#f73e2c', iconClass: 'brush-style-color brush-style-color--c1'},
                          {value: '#f2035c', iconClass: 'brush-style-color brush-style-color--c2'},
                          {value: '#9906a5', iconClass: 'brush-style-color brush-style-color--c3'},
                          {value: '#672ab5', iconClass: 'brush-style-color brush-style-color--c4'},
                          {value: '#3d4aad', iconClass: 'brush-style-color brush-style-color--c5'},

                          {value: '#43b052', iconClass: 'brush-style-color brush-style-color--c6'},
                          {value: '#009788', iconClass: 'brush-style-color brush-style-color--c7'},
                          {value: '#01bbd4', iconClass: 'brush-style-color brush-style-color--c8'},
                          {value: '#00a4f4', iconClass: 'brush-style-color brush-style-color--c9'},
                          {value: '#1091ee', iconClass: 'brush-style-color brush-style-color--c10'},

                          {value: '#88c64b', iconClass: 'brush-style-color brush-style-color--c11'},
                          {value: '#cdde38', iconClass: 'brush-style-color brush-style-color--c12'},
                          {value: '#feee37', iconClass: 'brush-style-color brush-style-color--c13'},
                          {value: '#fec224', iconClass: 'brush-style-color brush-style-color--c14'},
                          {value: '#fd981a', iconClass: 'brush-style-color brush-style-color--c15'},

                          {value: '#000000', iconClass: 'brush-style-color brush-style-color--c16'},
                          {value: '#5f7c8c', iconClass: 'brush-style-color brush-style-color--c17'},
                          {value: '#9d9d9d', iconClass: 'brush-style-color brush-style-color--c18'},
                          {value: '#7a5447', iconClass: 'brush-style-color brush-style-color--c19'},
                          {value: '#fd540c', iconClass: 'brush-style-color brush-style-color--c20'}
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