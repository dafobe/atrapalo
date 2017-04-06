
import {default as WidgetBase,
        buildNode} from '../../common/widgetBase';

const BRUSH_WIDTH = 5;
const BRUSH_COLOR = '#00CC99';


export default class Brush extends WidgetBase{
  constructor (container, name = 'Brush', stylesStore = [], onSelectBrush, onPaint) {
    super(container);
  
    this.name = name;
    this.stylesStore = stylesStore;

    this.lineWidth = BRUSH_WIDTH;
    this.strokeStyle = BRUSH_COLOR;

    this.brushStylesTypes;
    this.isSelected = false;
    
    this._label;
    this._sample;

    this.onSelectBrush = onSelectBrush;
    this.onPaint = onPaint;
  }

  _buildContainer(){
    
    this.domNode = super._buildContainer();

    this.domNode.classList.add('brush');

    this._label = buildNode('label', {class: 'brush-label'}, this.domNode);
    this.name && (this._label.innerText = this.name);
    this._sample = buildNode('node', {class: 'brush-sample'}, this.domNode);

    return this.domNode;
  }

  _startup(){
    super._startup();

    //init Styles Panel
    this.brushStylesTypes = this.stylesStore.map( 
                  (styleType) => new BrushDrawingStyles(null, styleType.label, styleType.type, styleType.values, (style, value) => this._updateBrushStyle(style, value)).init()
                                                );
    //init Listeners
    this.domNode.addEventListener('click', event => this._selectBrushHandler(event), false);
  }

  _updateBrushStyle(style, value){
    console.log(`--- Brush _updateBrushStyle ${style} ${value}`)
    this[style] = value;
    console.log(`--- Brush _updateBrushStyle after update`, this)
  }
  
  setSelected(){
    if(this.isSelected){
      return;
    }

    this.isSelected = true;
    this.onSelectBrush && this.onSelectBrush(this);
    console.log(`Brush ${this.name} has been selected`);
  }

  _selectBrushHandler(event){
    console.log(`selected Brush ${this.name}`, this)

    this.setSelected();
  }

  /*
    Hooks to implement by customized brushes
  */
  paint(context, position = {x: 0, y: 0}){
    console.log(`Brush ${this.name} is Painting`, position);
  }
  
  startPaint(context, position = {x: 0, y: 0}){ 
    console.log(`Brush ${this.name} is Starting to Paint`, position);
  }

  stopPaint(context){ 
    console.log(`Brush ${this.name} has Stopped Painting`);
  }
}

class BrushDrawingStyles extends WidgetBase{
  constructor (container, label, type, store = [], updateStyleHandler) {
    super(container);
    this.label = label;
    this.type = type;
    this.store = store;
  
    this.styles;
    this.selectedStyle;

    this.updateStyleHandler = updateStyleHandler;
  }

  _buildContainer(){
    this.domNode = buildNode('fieldset', {class: 'brush-styles-group'});
    return this.domNode;
  }
  
  _startup(){
    this.styles = this.store.map( (style) => new BrushStyle(this.domNode, this.type, style, (type, value) => this._updateStyleBrush(type, value))).map( (brushStyle) => brushStyle.init())
  }

  _updateStyleBrush(type, value){
    console.log(`BrushDrawingStyles _updateStyleBrush: ${type}, ${value}`, this);
    this.updateStyleHandler && this.updateStyleHandler(type, value);
  }
}

class BrushStyle extends WidgetBase{
  constructor (container, type, value, onSelectHandler, icon, sample) {
    super(container);
    this.type = type;
    this.value = value;
    this.icon = icon;
    this.sample = sample;

    this.onSelectHandler = onSelectHandler;
  }
  _buildContainer(){
    this.domNode = super._buildContainer();
    let container = buildNode('div', {class: 'brush-styles-style'}, this.domNode);

    if(this.icon){
      buildNode('div', {class: 'brush-styles-style_icon'}, container);
    }

    if(this.sample){
      buildNode('div', {class: 'brush-styles-style_sample'}, container);
    }

    return this.domNode;
  }
   _startup(){
    super._startup();

    //init Listeners
    this.domNode.addEventListener('click', event => this._onSelectStyleHandler(event), false);
  }

  _onSelectStyleHandler(event){
    console.log(`BrushStyle _onSelectStyleHandler: ${this.type}, ${this.value}`);
    this.onSelectHandler && this.onSelectHandler(this.type, this.value);
  }
}