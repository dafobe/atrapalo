
export default class Brush {
  constructor (name, allowedTools = [], onSelectBrush, onPaint) {
    this.name;
    this.lineWidth = 3;
    this.lineJoin = 'round';
    this.lineCap = 'round';
    this.strokeStyle = '#00CC99';
    
    this._allowedTools = allowedTools;
    
    this._domContainer;

  }

  onClick(){ }

  _onClick(){ 
    this.onClick();
  }
}