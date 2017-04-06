const configs = {
'button': 'mdc-button mdc-js-button mdc-button--fab',
'button-colored': 'mdc-button--accent',
'fab': 'mdc-fab material-icons',
'icon': 'mdc-icon-toggle material-icons mdc-ripple-upgraded mdc-ripple-upgraded--unbounded mdc-ripple-upgraded--foreground-deactivation'
}

export default function(component){
	return function (type){
		const classToApply = configs[type] || '';
		
		classToApply.split(' ').forEach((cssClass) => component.classList.add(cssClass));

		return component;
	}
}