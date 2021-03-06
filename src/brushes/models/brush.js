import styles from '../assets/styles.less';

import {default as WidgetBase,
        buildButton,
        buildNode} from '../../common/widgetBase';

const BRUSH_WIDTH = 5;
const BRUSH_COLOR = '#00CC99';


export default class Brush extends WidgetBase{
  constructor (container, name = 'Brush', stylesStore = [], onSelectBrush, onStartPaint, onPaint, onStopPaint) {
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
    this.onStartPaint = onStartPaint;
    this.onPaint = onPaint;
    this.onStopPaint = onStopPaint;
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
    this[style] = value;
  }
  
  setSelected(){
    if(this.isSelected){
      return;
    }

    this.isSelected = true;
    this.onSelectBrush && this.onSelectBrush(this);
  }

  _selectBrushHandler(event){
    this.setSelected();
  }

  getContextStyles(){
    return {  
              lineWidth: this.lineWidth,
              strokeStyle: this.strokeStyle
            }
  }

  /*
    Hooks to implement by customized brushes
  */
  paint(context, position = {x: 0, y: 0}){
    this.onPaint && this.onPaint(position);
  }
  
  startPaint(context, position = {x: 0, y: 0}){
    this.onStartPaint && this.onStartPaint(position);
  }

  stopPaint(context){ 
    this.onStopPaint && this.onStopPaint();
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
    let label;

    this.domNode = buildNode('div', {class: 'brush-styles-group'});
    
    if(this.label){
      label = buildNode('label');
      label.innerText = this.label;
      this.domNode.appendChild(label);
    }

    
    return this.domNode;
  }
  
  _startup(){
    this.styles = this.store.map( (style) => new BrushStyle(null, 
                                                            this.type, 
                                                            style.value, 
                                                            (type, value) => this._updateStyleBrush(type, value),
                                                            style.iconClass,
                                                            style.iconText,
                                                            style.sampleClass
                                                            ))
                            .map( (brushStyle) => brushStyle.init());

    this.styles.forEach(style => style.placeTo(this.domNode));
  }

  _updateStyleBrush(type, value){
    //call callback
    this.updateStyleHandler && this.updateStyleHandler(type, value);

    //enable other styles
    let filtered = this.styles.filter(style => style.value != value)
                              .map(style => style.disabled = false);
  }
}

class BrushStyle extends WidgetBase{
  constructor (container, type, value, onSelectHandler, icon, iconText, sample) {
    super(container);
    this.type = type;
    this.value = value;
    this.icon = icon;
    this.iconText = iconText;
    this.sample = sample;
    this._iconContainer;
    this._disabled = false;

    this.onSelectHandler = onSelectHandler;
  }
  _buildContainer(){
    
    let container = buildNode('div', {class: 'brush-styles-style'}),
        icon,
        sample;

    if(this.icon){
      icon = buildButton('span', {class: `brush-styles-style_icon ${this.icon}`});
      container.appendChild(icon);
    }

    if(this.iconText){
      if(!icon){
        icon = buildButton('span', {class: `brush-styles-style_icon`});
        container.appendChild(icon);
      }
      icon.innerHTML = this.iconText;
    }

    this._iconContainer = icon;

    if(this.sample){
      sample = buildNode('span', {class: `brush-styles-style_sample ${this.sample}`});
      container.appendChild(sample);
    }

    if(!this.sample){
      container.classList.add('brush-styles-style--simple');
    }

    this.domNode = container;
    
    return this.domNode;
  }
   _startup(){
    super._startup();

    //BrushStyle init Listeners
    this.domNode.addEventListener('click', event => this._onSelectStyleHandler(event), false);
  }

  _onSelectStyleHandler(event){
    this.disabled = true;
    this.onSelectHandler && this.onSelectHandler(this.type, this.value);
  }
  
  get disabled() {
      return this._disabled;
  }

  set disabled(disabled) {
      if(this._disabled === disabled){
        return;
      }

      this._iconContainer.disabled = disabled;
      this._disabled = disabled;
  }
}