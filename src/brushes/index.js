require('./assets/styles.less');
import {default as Chart, DonutChart} from './models/chart';

const init = () => {
	
	const donutOptions = {
		width: 200,
		height: 200,
		domContainer: 'graph-container',
		radius: 100,
		innerRadius: 50 
	}

	const donutChart = new DonutChart(donutOptions);
	donutChart.height = 444;
	donutChart.init();
	console.log(donutChart.print());
}

export {init};