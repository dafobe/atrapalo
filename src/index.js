//Needed 
if (module.hot) {
  module.hot.accept()
}

import Layout from './layout';
import {Board} from './board';
import {Factory} from './brushes';

//add canvas to layout
//add brushes to canvas

//init application
const name = `Atrapalo`;
const brushFactory = new Factory();
console.log(`application ${name} entrypoint 2`);

const brushes = [brushFactory.getInstance('simpleBrush')];
const blackboard = new Board('paint_container', brushes);

blackboard.init();