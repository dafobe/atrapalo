
import {expect} from 'chai';
import {default as Board} from '../models/board.js';
import {default as Brush} from '../../brushes/models/brush.js'
import {default as WidgetBase, 
        createElement, 
        addAttributeToElement,
        buildNode,
        buildCard,
        getScreenWidth,
        getScreenHeight} from '../../common/widgetBase';


describe('Board Component logic', () => {

  describe('create new Board instance', () => {
    it('call without params', () => {
      const result = new Board(null, []);
      expect(result).to.be.an.instanceof(Board);
    });

    it('call with Container param', () => {
      const boardContainer = buildNode('div', {})
      const result = new Board([]);
      expect(result).to.be.an.instanceof(Board);
    });
/*
    it('call with params', () => {
      const name = 'User';
      const result = getHello(name);

      expect(result).to.equal(`Hello dear ${name}`);
    });
    */
  });

  describe('validate Board defaults', () => {
    it('board without Brushes', () => {
      const result = new Board(null, []);
      expect(result).to.be.an.instanceof(Board);
    });
  /*
    it('call with params', () => {
      const name = 'User';
      const result = getHello(name);

      expect(result).to.equal(`Hello dear ${name}`);
    });
    */
  });
});