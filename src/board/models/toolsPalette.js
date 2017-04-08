import {default as WidgetBase, 
        buildNode,
        buildButton} from '../../common/widgetBase';

const redoHistory = [];
const undoHistory = [];

export default class ToolsPalette extends WidgetBase{
  
  constructor (container, context, brushes = []) {
    super(container);
    this.context = context;
    this.brushes = brushes.map((brush) => { brush.onSelectBrush = (brush) => this._onSelectBrush(brush); 
                                            brush.onPaint = (position) => this._onPaint(position);
                                            brush.onStartPaint = (position) => this._onStartPaint(position);
                                            brush.onStopPaint = () => this._onStopPaint();
                                          return brush.init()});

    this.brushesPanel = {};
    this.historyPanel = {};
    this.stylesPanel = {};
    
    this.activeBrush;
    this._currentHistory;
  }

  /**
  * Overrides super build method
  */
  _buildContainer() {
    
    this.domNode = super._buildContainer();
   
    this.historyPanel.domNode = buildNode('fieldset', {class: 'flex-item board-tools-history'}, this.domNode);
    this.historyPanel.undo = buildButton('undo', {class: 'button--undo', label: 'undo'}, this.historyPanel.domNode);
    this.historyPanel.redo = buildButton('redo', {class: 'button--redo', label: 'redo'}, this.historyPanel.domNode);

    this.brushesPanel.domNode = buildNode('fieldset', {class: 'flex-item board-tools--brushes'}, this.domNode);
    this.brushes.forEach( (brush) => {
      this.brushesPanel.domNode.appendChild(brush.domNode);
    })

    this.stylesPanel.domNode = buildNode('fieldset', {class: 'flex-item board-tools-styles'}, this.domNode);
    //this.activeBrush && this.

    return this.domNode;
  }
  
  /*
  * Overrides _startup Hook
  */
  _startup(){
    super._startup();

    //select first Brush onload
    if(this.brushes.length){
      this.brushes[0].setSelected();
    }

    this.historyPanel.undo.addEventListener('click', () => this._onUndo(), false);
    this.historyPanel.redo.addEventListener('click', () => this._onRedo(), false);

  }

  _onRedo(){
    console.log('Redo', undoHistory, redoHistory);
    let action = redoHistory.pop();
    if(action){
      undoHistory.push(action)
      this._redraw();
    }

  }

  _onUndo(){
    console.log('Undo', undoHistory, redoHistory);
    let action = undoHistory.pop();
    if(action){
      redoHistory.push(action)
      this._redraw();
    }
  }

  _onSelectBrush(brush){
    this.activeBrush = brush;
    this._restartStylesPanel(brush.brushStylesTypes);
  }

  _onStartPaint(position){
    this._currentHistory = new HistoryAction(this.activeBrush.getContextStyles(), this.activeBrush.paint, position);
    redoHistory.length = 0;
  }

  _onPaint(position){
    this._currentHistory.addPosition(position);
    
  }

  _onStopPaint(){
    this._currentHistory && undoHistory.push(this._currentHistory);

    this._currentHistory = null;
    
  }

  _restartStylesPanel(brushStylesTypes){
    brushStylesTypes.map((styleType)=>styleType.placeTo(this.stylesPanel.domNode));
  }
  
  _resetCanvas(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  _redraw(historyList = undoHistory){
    console.log('REdraw History', undoHistory, redoHistory);
    this._resetCanvas();
    historyList.forEach(history => history.paintHistory(this.context));
  }
}

class HistoryAction{
  
  constructor (styles = {}, paintHandler, startPosition) {
    this.styles = styles;
    this.paint = paintHandler;
    this.startPosition = startPosition;
    this.positions = [startPosition];
  }

  addPosition(position){
    this.positions.push(position);
  }
 
  paintHistory(context){
    let styles = this.styles;

    if(!context){
      console.error('this method needs a context as parameter!!');
    }

    //Setup context with the brush styles
    Object.keys(styles).forEach(function (key) {
      context[key] = styles[key];
    });

    context.beginPath();
    context.moveTo(this.startPosition.x, this.startPosition.y);
    context.stroke();
    //Call paint handler of brush
    this.paint && this.positions.forEach(position => this.paint(context, position));
  }
}