import 'jsdom-global/register';
import {expect} from 'chai';

import {default as WidgetBase, 
        createElement, 
        addAttributeToElement,
        buildNode,
        buildCard,
        getScreenWidth,
        getScreenHeight} from '../widgetBase.js';


describe('Core logic', () => {
  describe('create WidgetBase Component', () => {

    it('call without params', () => {
      const widget = new WidgetBase();
      
      expect(widget).to.be.an.instanceof(WidgetBase);
      expect(widget).to.have.deep.property('_domContainer');
      
    });

    it('call with Container param', () => {
      const container = buildNode('div', {})
      const widget = new WidgetBase(container, []);

      expect(widget).to.be.an.instanceof(WidgetBase);
      expect(widget).to.have.deep.property('_domContainer');
      
    });

  });
});