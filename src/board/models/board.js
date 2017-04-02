import styles from '../assets/styles.less';

import {default as WidgetBase, 
        createElement, 
        addAttributeToElement,
        getScreenWidth,
        getScreenHeight} from '../../common/widgetBase'

export default class Board extends WidgetBase{
  constructor (container, brushes) {
    
    super(container);
    
    this.brushes = brushes;
    this.activeBrush;
    this._toolsPalette;

    this._lastBrushState;

    this._canvasContainer;
    this._context;
       
  }

  draw(){
    //add to active path
    //brush.draw(init {x,y}, end{x,y}) return path
  }

  saveHistory(){
    //call context save
    //remove drawListeners
  }

  _buildContainer() {
    
    super._buildContainer();
    console.log(styles)
    this._canvasContainer = createElement('canvas', {class: styles.boardCanvas});
    this.domNode.appendChild(this._canvasContainer);
    //addCanvas();
  }

  _startup(){
    super._startup();
    //create context
    this._context = this._canvasContainer.getContext('2d');
    console.log(`board startup: ${this._context}`)
    //create palette
    //add listeners
  }
}