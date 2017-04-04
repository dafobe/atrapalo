import {default as WidgetBase, 
        createElement, 
        addAttributeToElement,
        buildNode,
        buildIconButton,
        getScreenWidth,
        getScreenHeight} from '../../common/widgetBase';

export default class ToolsPalette extends WidgetBase{
  
  constructor (container, context, brushes = [], onStartPaint, onPaint, onStopPaint) {
    super(container);
    this.context = context;
    
    this.brushesPanel = {};
    this.historyPanel = {};
    this.stylesPanel = {};

    this.brushesPanel.brushes = brushes;
        
    this._selectedBrush;
  }

  /**
  * Overrides super build method
  */
  _buildContainer() {
    
    this.domNode = super._buildContainer();
   
    this.historyPanel.domNode = buildNode('div', {class: 'flex-item board-tools-history'}, this.domNode);
    this.historyPanel.redo = buildIconButton('mood', {class: 'flex-item board-tools-history'}, this.domNode);
    /*this.historyPanel.redo = buildNode('div', {class: 'button--prev'}, this.historyPanel.domNode);*/
    this.historyPanel.redo = buildNode('div', {class: 'button--next'}, this.historyPanel.domNode);

    this.brushesPanel.domNode = buildNode('div', {class: 'flex-item board-tools--brushes'}, this.domNode);
    this.stylesPanel.domNode = buildNode('div', {class: 'flex-item board-tools-styles'}, this.domNode);

    return this.domNode;
  }

  
  /*
  * Overrides _startup Hook
  */
  _startup(){
    super._startup();

    //init history panel

    //init brushes panel

    //init styles panel

    //create palette
    //this.toolsPalette = new ToolsPalette(this._toolsContainer, this._context, this.brushes).init();
 
    //add listeners
  }

}