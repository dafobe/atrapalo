import styles from '../assets/styles.less';

import {default as WidgetBase, 
        createElement, 
        addAttributeToElement,
        buildNode,
        buildCard,
        getScreenWidth,
        getScreenHeight} from '../../common/widgetBase';

import ToolsPalette from './toolsPalette';

const canvasMouseProps = {};
const history = [];

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

    const canvasWrapper = buildCard({class: 'board-canvas-container'}, this.domNode);
    this.canvas.parentNode = canvasWrapper;
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
    this.canvas.domNode.addEventListener('mouseout', this._onStopDraw, false);

    this.canvas.domNode.addEventListener('touchstart', this._onStartDraw, false);
    this.canvas.domNode.addEventListener('touchend', this._onStopDraw, false);

    window.addEventListener('scroll', () => this.recalcCanvasMouse(), false);
  }

  init(){
    super.init();
    setupCanvasMouse(this.canvas.domNode);
  }

  onStartDraw(event){
    if(!this.toolsPalette.activeBrush){
      console.log('Ops, Please select first an Brush to paint ');
      return
    }

    if (event.target == this._context.canvas) {
      event.preventDefault();
    }

    this.toolsPalette.activeBrush.startPaint(this._context, getPosition(event));

    //add listener to print
    this.canvas.domNode.addEventListener('mousemove',this._onDraw , false);
    this.canvas.domNode.addEventListener('touchmove', this._onDraw, false);
  }

  onDraw(event){
    if (event.target == this._context.canvas) {
      event.preventDefault();
    }

    this.toolsPalette.activeBrush.paint(this._context, getPosition(event));
  }

  onStopDraw(event){
    if(!this.toolsPalette.activeBrush){
      return
    }

    if (event.target == this._context.canvas) {
      event.preventDefault();
    }

    this.toolsPalette.activeBrush.stopPaint(this._context);
    
    this.canvas.domNode.removeEventListener('mousemove', this._onDraw, false);

    this.saveHistory();
  }
  

  saveHistory(){
    this._context.save();
  }

  recalcCanvasMouse(){
    setupCanvasMouse(this._context.canvas);
  }
}

const setupCanvasMouse = function(canvas){
   let rect = canvas.getBoundingClientRect();
  canvasMouseProps.rectLeft = rect.left;
  canvasMouseProps.rectTop = rect.top;
  canvasMouseProps.cssScaleX = canvas.width / canvas.offsetWidth;
  canvasMouseProps.cssScaleY = canvas.height / canvas.offsetHeight;
}

const getPosition = function (event){
  let clientX = (event.touches && event.touches[0].clientX) || event.clientX,
      clientY = (event.touches && event.touches[0].clientY) || event.clientY;

  const x = (clientX - canvasMouseProps.rectLeft) * canvasMouseProps.cssScaleX;
  const y = (clientY - canvasMouseProps.rectTop) * canvasMouseProps.cssScaleY;
  return {x, y}
}