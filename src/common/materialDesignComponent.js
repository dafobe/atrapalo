//import materialStyles from './assets/surfaceCSS/surface_styles.scss';
import material from './assets/materialDesign.scss';



const configs = {
'button': 'mdc-fab mdc-fab--mini',
'card': 'mdc-card',
'card__header': 'mdc-card__primary',
'card__header--title' : 'mdc-card__title',
'card__body' : 'mdc-card__supporting-text',
'card__actions': 'mdc-card__actions'

}

export default function(component){
	return function (type){
		const classToApply = configs[type] || '';
		
		classToApply.split(' ').forEach((cssClass) => component.classList.add(cssClass));

		return component;
	}
}