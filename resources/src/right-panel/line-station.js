// line-station.js
export default class Line_Station extends HTMLElement {
	constructor() {
		super();
		this.shadow_root = this.attachShadow({ mode: 'open' });

		// charger CSS externe
		const style_link = document.createElement('link');
		style_link.setAttribute('rel', 'stylesheet');
		style_link.setAttribute('href', 'style/line-station.css');
		this.shadow_root.appendChild(style_link);

		// conteneur principal
		this.container = document.createElement('div');
		this.container.classList.add('station-row');
		this.shadow_root.appendChild(this.container);

		this.data = null;
		this.stations = null;
	}

	/**  
	 * @param {Object} data  { station_code, flag, … }  
	 */
	static Create(data,stations) {
		const el = document.createElement('line-station');
		el.data = data;
		el.stations = stations;
		el.Render();
		return el;
	}

	/** Reconstruit la ligne de station */
	Render() {
		if (!this.data) return;

		// reset
		this.container.innerHTML = '';

		// icône SVG : rectangle plein-hauteur + rond blanc centré
		const icon_wrap = document.createElement('div');
		icon_wrap.classList.add('station-icon-wrap');
		if(!this.data.arrival_minute)
			icon_wrap.innerHTML = `
			<svg class="station-icon-svg" viewBox="0 0 10 40" preserveAspectRatio="none"">
				<path d="M0,20 A5,5 0 0 1 10,20 V40 H0 Z"  style="fill: ${this.data.parent.parent.color.default};"/>
				<circle cx="5" cy="20" r="4" />
			</svg>`;
		else if(!this.data.departure_minute)
			icon_wrap.innerHTML = `
			<svg class="station-icon-svg" viewBox="0 0 10 40" preserveAspectRatio="none">
  				<path d="M0,0 H10 V20 A5,5 0 0 1 0,20 Z" style="fill: ${this.data.parent.parent.color.default};" />
				<circle cx="5" cy="20" r="4" />
			</svg>`;
		else
			icon_wrap.innerHTML = `
			<svg class="station-icon-svg" viewBox="0 0 10 40" preserveAspectRatio="none">
				<rect width="10" height="40" style="fill: ${this.data.parent.parent.color.default};"/>
				<circle cx="5" cy="20" r="4" />
			</svg>`;
		this.container.appendChild(icon_wrap);

		// nom de la station
		const station_name = document.createElement('span');
		station_name.classList.add('station-name');
		station_name.textContent = this.stations[this.data.station_ID].label;
		if (this.data.flag && this.data.flag.includes('warning')) {
			station_name.classList.add('warning');
		}
		this.container.appendChild(station_name);
	}
}

customElements.define('line-station', Line_Station);