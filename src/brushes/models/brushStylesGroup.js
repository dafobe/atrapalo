export default class BrushStylesGroup {
  constructor (name, description, type, styles = []) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.styles = styles;
  
    this._domContainer;
  }

  _buildRendering(){}

  _init(){}
}