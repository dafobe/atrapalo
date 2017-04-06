import {default as WidgetBase, 
        buildNode,
        buildButton} from '../../common/widgetBase';

export default class ToolsPalette extends WidgetBase{
  
  constructor (container, context, brushes = [], onStartPaint, onPaint, onStopPaint) {
    super(container);
    this.context = context;
    this.brushes = brushes.map((brush) => {brush.onSelectBrush = (brush) => this._onSelectBrush(brush); 
                                          return brush.init()});

    this.brushesPanel = {};
    this.historyPanel = {};
    this.stylesPanel = {};
    
    this.activeBrush;
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
  }

  /*
    Select Brush Handler
    This handler must rebuild the Styles pannel because the allowed selectable styles are of each own style
  */
  _onSelectBrush(brush){
    console.log('ToolsPalette _onSelectBrush', this);
    this.activeBrush = brush;
    this._restartStylesPanel(brush.brushStylesTypes);
  }

  _restartStylesPanel(brushStylesTypes){
    console.log('ToolsPalette _restartStylesPanel', brushStylesTypes);
    brushStylesTypes.map((styleType)=>styleType.placeTo(this.stylesPanel.domNode));
  }
  _removeStylesChildren(container){

  }

  paint(position){
    super.paint(position);
    this.context
  }
  
  startPaint(event){ 
    if(!this.activeBrush){
      console.log('Ops, Please select first an Brush to paint ');
      return
    }

    this.activeBrush.paint(event);
  }

  stopPaint(){ }
}