import Brush from './models/brush';
import SimpleBrush from './models/simpleBrush';

export default class BrushFactory{
	constructor(){
		this.brushClass = Brush;
	}

	getInstance(type, ...props){
		switch(type){
			case 'marker':
					//set brush class = Marker
			case 'highlighter':
					//set brush class = HighLighter
			case 'simpleBrush':
					this.brushClass = SimpleBrush;
			default: 
		}

		return new this.brushClass(props);
	}
}