//Needed to hot reload functionality for Development
if (module.hot) {
  module.hot.accept()
}

import Layout from './layout';
import {Board} from './board';
import {Factory} from './brushes';

//init application
const brushFactory = new Factory();

const brushes = [brushFactory.getInstance('simpleBrush')];
const blackboard = new Board('paint_container', brushes);

blackboard.init();