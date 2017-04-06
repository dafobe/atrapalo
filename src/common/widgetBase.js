import {default as MaterialComponent} from './materialDesignComponent';

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

  _buildContainer(container = this._domContainer) {
    //console.log(`WidgetBase _buildContainer: ${container}`);
    this._domContainer = container;
    this.domNode = getContainerNode(container) || buildNode('div', {});

    if(!this.domNode){
      throw Error(`Container ${this._domContainer} not valid`)
    }
    
    return this.domNode;
  }
  
  _startup(){
    return this;
  }

  destroy(){
    removeChildNodes(this.domNode);
    removeNode(this.domNode);
  }

  init(){
    //console.log('WidgetBase: init');
    this._buildContainer();
    this._startup();
    return this;
  }

  placeTo(container){
    container && container.appendChild(this.domNode);
  }
}

export const buildNode = function(type, attributes, container){
  const element = createElement(type, attributes);
  container && container.appendChild(element);
  
  return element;
}

export const buildButton = function(type, attributes = {}, container){
  
  const button = buildNode('button', attributes, container);
  //const icon = buildNode('i',{}, button);
  attributes.label && (button.innerText = attributes.label)
  //icon.innerHTML = 'favorite';
  //const icon = buildNode('i', {class: 'material-icons', innerText: type}, button);

  container && container.appendChild(button);

  //MaterialComponent(icon)('icon');

  return MaterialComponent(button)('button');
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

export const removeChildNodes = function (node){
  while (node.firstChild) {
      node.removeChild(node.firstChild);
  }
  return node;
}

export const removeNode = function (node){
  let parent = node.parentNode;
  
  parent && parent.removeChild(node);
  
  return parent;
}