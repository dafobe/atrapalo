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
    this.canvas = {};

    this._toolsContainer;
    this._context;

    //create bounded event handlers in order to be able to remove them
    this._onStartDraw = event => this.onStartDraw(event)
    this._onDraw = event => this.onDraw(event)
    this._onStopDraw = event => this.onStopDraw(event)
       
  }

  /**
  * Overrides super build method
  */
  _buildContainer() {
    this.domNode = super._buildContainer();

    const canvasWrapper = buildNode('div', {class: 'board-canvas-container'}, this.domNode);

    this.canvas.domNode = buildNode('canvas', {class: 'board-canvas'}, canvasWrapper);
    this._toolsContainer = buildNode('div', {class: 'board-tools flex-menu'}, this.domNode);
    
    return this.domNode;
   
  }

  /*
  * Overrides _startup Hook
  */
  _startup(){
    super._startup();
    //create context needed for canvas
    this._context = this.canvas.domNode.getContext('2d');

    //create palette
    this.toolsPalette = new ToolsPalette(this._toolsContainer, this._context, this.brushes).init();
 
    //add listeners
     //init Listeners
    this.canvas.domNode.addEventListener('mousedown', this._onStartDraw, false);
    this.canvas.domNode.addEventListener('mouseup', this._onStopDraw, false);
  }

  

  onStartDraw(event){
    console.log('BOARD startDraw calling brush start paint')

    if(!this.toolsPalette.activeBrush){
      console.log('Ops, Please select first an Brush to paint ');
      return
    }

    this.toolsPalette.activeBrush.startPaint(this._context, getPosition(event, this.canvas.domNode));

    //add listener to print
    this.canvas.domNode.addEventListener('mousemove',this._onDraw , false);
  }

  onDraw(event){
    console.log('BOARD onDraw calling brush paint');

    this.toolsPalette.activeBrush.paint(this._context, getPosition(event, this.canvas.domNode));
  }

  onStopDraw(event){
    console.log('BOARD stopDraw calling brush paint');

    this.toolsPalette.activeBrush.stopPaint(this._context, getPosition(event, this.canvas.domNode));
    this.canvas.domNode.removeEventListener('mousemove', this._onDraw, false);
  }
  

  saveHistory(){
    //call context save
    //remove drawListeners
  }

}

const getPosition = function (event, container){
  const x = event.pageX - container.offsetLeft;
  const y = event.pageY - container.offsetTop;
  return {x, y}
}