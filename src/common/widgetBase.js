import {iconToggle} from 'material-components-web';
/**
This generic class defines the lifeCycle of the components

  buildContainer: looks for the given container id in the Dom and Dom Nodes
  startup: hook for init children when is required
  init: start the widget

*/

export default class WidgetBase {
  constructor (container) {
    //console.log(`WidgetBase constructor: ${container}`);
    this._domContainer = container;
    this.domNode;
  }

  _buildContainer() {
    //console.log(`WidgetBase _buildContainer: ${this._domContainer}`)
    this.domNode = getContainerNode(this._domContainer);

    if(!this.domNode){
      throw Error(`Container ${this._domContainer} not valid`)
    }
    
    return this.domNode;
  }
  
  _startup(){
    //console.log('WidgetBase: _startup');
    //create context
    //create palette
  }

  init(){
    //console.log('WidgetBase: init');
    this._buildContainer();
    this._startup();
  }
}

export const buildNode = function(type, attributes, container){
  const element = createElement(type, attributes);
  container && container.appendChild(element);
  
  return element;
}

export const buildIconButton = function(type, attributes, container){
  const button = buildNode('button', {class: 'mdl-button mdl-js-button mdl-button--icon'});
  const icon = buildNode('i', {class: 'material-icons', innerText: type}, button);
  container && container.appendChild(button);
  
  return button;
}

export const getContainerNode = function(container){
  if(typeof container === 'string'){
    return document.querySelector(`#${container}`);
  }else if(container instanceof HTMLElement){
    return container;
  }
}

export const createElement = function(type, attributes = {}){
  let node = document.createElement(type);
  
  attributes && Object.keys(attributes).forEach(key => addAttributeToElement(node, key, attributes[key]))
  
  return node; 
}

export const addAttributeToElement = function(element, name, value){
  element && element.setAttribute(name, value);
}

export const getScreenWidth = function (){
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

export const getScreenHeight = function (){
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}