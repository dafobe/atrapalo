
import {expect} from 'chai';
import {buildNode} from '../widgetBase.js';


describe('Core logic', () => {

  describe('test buildNode behavior', () => {

    it('call without params', () => {
      const result = 'yeah';
      expect(result).to.equal('yeah');
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