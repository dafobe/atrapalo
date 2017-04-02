export default class ToolsPalette {
  
  constructor (canvas, brushes, brushStyles, onSelectBrushCallback) {
    this.canvas = canvas;
    this.brushes = brushes;
    this.brushStylesGroups = brushStyles;

    this._selectedBrush;
     
    this._domContainer;
  }

  selectBrush(brush){
  	this._selectedBrush
  }


}