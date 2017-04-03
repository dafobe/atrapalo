//Needed 
if (module.hot) {
  module.hot.accept()
}

import Layout from './layout';
import {Board} from './board';
//import layout
//import canvas (board)
//import brushes

//add canvas to layout
//add brushes to canvas

//init application


const name = `Atrapalo`;

console.log(`application ${name} entrypoint 2`);
const blackboard = new Board('paint_container');

blackboard.init();