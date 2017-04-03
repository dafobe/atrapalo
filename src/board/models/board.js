import styles from '../assets/styles.less';


import {default as WidgetBase, 
        createElement, 
        addAttributeToElement,
        buildNode,
        getScreenWidth,
        getScreenHeight} from '../../common/widgetBase';

import ToolsPalette from './toolsPalette';

export default class Board extends WidgetBase{
  constructor (container, brushes = []) {
    super(container);
    
    this.brushes = brushes;
    this.toolsPalette = {};
    this.canvas;

    this._canvasContainer;
    this._toolsContainer;
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

  /**
  * Overrides super build method
  */
  _buildContainer() {
    this.domNode = super._buildContainer();

    const canvasWrapper = buildNode('div', {class: 'board-canvas-container'}, this.domNode);

    this._canvasContainer = buildNode('canvas', {class: 'board-canvas'}, canvasWrapper);
    this._toolsContainer = buildNode('div', {class: 'board-tools flex-menu'}, this.domNode);
   
    
    return this.domNode;
   
  }

  /*
  * Overrides _startup Hook
  */
  _startup(){
    super._startup();
    //create context needed for canvas
    this._context = this._canvasContainer.getContext('2d');

    //create palette
    this.toolsPalette = new ToolsPalette(this._toolsContainer, this._context, this.brushes).init();
 
    //add listeners
  }
}