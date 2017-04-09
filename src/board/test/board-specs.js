import {expect} from 'chai';
import {default as Board} from '../models/board.js';
import {default as Brush} from '../../brushes/models/brush.js'
import {buildNode} from '../../common/widgetBase';


describe('Board Component logic', () => {
 
  describe('create new Board instance', () => {
    it('call without params', () => {
      const result = new Board(null, []);
      expect(result).to.be.an.instanceof(Board);
    });

    it('call with Container param', () => {
      const boardContainer = buildNode('div', {})
      const board = new Board(boardContainer, []);

      expect(board).to.be.an.instanceof(Board);
      expect(board).to.have.deep.property('_domContainer');
      
    });
  });
});