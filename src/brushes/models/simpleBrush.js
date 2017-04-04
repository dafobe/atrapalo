import {default as Brush} from './brush';

export default class SimpleBrush extends Brush{
  constructor (container, name = '', allowedTools = [], onSelectBrush, onPaint) {
    super(container);

    this.name;
    this.lineWidth = 3;
    this.lineJoin = 'round';
    this.lineCap = 'round';
    this.strokeStyle = '#00CC99';
    
    this._allowedTools = allowedTools;
    
    this._domContainer;

  }
}