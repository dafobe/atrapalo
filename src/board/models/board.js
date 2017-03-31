//import  colors

export default class Board {
  constructor (width, height, background) {
    this.width = options.width;
    this.height = options.height;
    this.background;
    this.brushes = [];
    this.activeBrush = options.activeBrush;
    
    this._brushStokes = [];
    this._domContainer;
       
  }

  print() {
    return `Printing Board: w: ${this.width}, h: ${this.height}, background: ${this.background}`;
  }

  addBrush(brush /*Brush*/){
    this.brushes.push(brush);
  }

  paint(){

  }

  _buildContainer() {
    
    this._domContainer;
    
    return this._domContainer;
  }
  
  init(){
    let container = this._buildContainer();
    this._buildChart(container);
    this._startup();
  }
}