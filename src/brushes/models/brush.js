import {default as WidgetBase,
        buildNode} from '../../common/widgetBase';

export default class Brush extends WidgetBase{
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

  _buildRendering(){
    this.domNode = super._buildContainer();

    buildNode('div', {class: 'brush-label', textContent: this.name}, this.domNode);

    buildNode('div', {class: 'brush-sample'}, this.domNode);

    return this.domNode
  }

  getBrushSample(){ }

  onClick(){ }

  _onClick(){ 
    this.onClick();
  }
}

class BrushStylesGroup extends WidgetBase{
  constructor (container, name, description, type, styles = []) {
    super(container);
    this.name = name;
    this.description = description;
    this.type = type;
    this.styles = styles;
  
    this._domContainer;
  }

  _buildRendering(){

  }

  _init(){}
}

class BrushStyle extends WidgetBase{
  constructor (container, type, value, icon, sample) {
    super(container);
    this.type;
    this.value;
    this.icon;
    this.sample;
    
    this._domContainer;
  }
}