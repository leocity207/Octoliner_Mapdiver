// line-schedule.js
import Line_Station from './line-station.js';

/**
 * The **Ligne info** is a n object used to display line information.
 * Structure
 * ---------
 * 
 * The ligne infos has two componants:
 * 
 * - **Title and Subtitle**: Provides line names and icons.
 * - **Info about the line** : Provide information about the line status globaly
 * - **Line schedule data**: display all the line schedule to the user.
 */
export default class Line_Schedule extends HTMLElement {
	constructor() {
		super();
		this.shadow_root = this.attachShadow({ mode: 'open' });

		// charger CSS externe
		const style_link = document.createElement('link');
		style_link.setAttribute('rel', 'stylesheet');
		style_link.setAttribute('href', 'style/line-schedule.css');
		this.shadow_root.appendChild(style_link);

		// conteneur principal
		this.container = document.createElement('div');
		this.container.classList.add('schedule-item');
		this.shadow_root.appendChild(this.container);

		this.data = null;
		this.stations = null;
	}

	/**  
	 * @param {Object} data  sch = { label, infomessages, lineflowstops, … }  
	 */
	static Create(data, stations) {
		const el = document.createElement('line-schedule');
		el.data = data;
		el.stations = stations;
		el.Render();
		return el;
	}

	/** Reconstruit l’horaire pliable */
	Render() {
		if (!this.data) return;
		this.container.innerHTML = '';

		// header
		const header = document.createElement('div');
		header.classList.add('schedule-header');
		header.textContent = this.data.label;

		if (this.data.infomessages?.length) {
			const svg_ns = 'http://www.w3.org/2000/svg';
			const info_icon = document.createElementNS(svg_ns, 'svg');
			info_icon.setAttribute('class', 'schedule-info-icon');
			info_icon.setAttribute('viewBox', '0 0 24 24');
			info_icon.setAttribute('width', '16');
			info_icon.setAttribute('height', '16');

			const circle = document.createElementNS(svg_ns, 'circle');
			circle.setAttribute('cx', '12');
			circle.setAttribute('cy', '12');
			circle.setAttribute('r', '10');
			circle.setAttribute('fill', '#888');

			const text = document.createElementNS(svg_ns, 'text');
			text.setAttribute('x', '12');
			text.setAttribute('y', '16');
			text.setAttribute('text-anchor', 'middle');
			text.setAttribute('font-size', '12');
			text.setAttribute('fill', '#fff');
			text.textContent = 'i';

			info_icon.append(circle, text);
			header.appendChild(info_icon);
		}

		// détails cachés
		const details = document.createElement('div');
		details.classList.add('schedule-details');

		// toggle
		header.addEventListener('click', () => {
			details.classList.toggle('open');
		});

		this.container.append(header, details);

		// stations
		this.data.lineflowstops.forEach(st => {
			st.parent = this.data;
			details.appendChild(Line_Station.Create(st,this.stations));
		});
	}
}

customElements.define('line-schedule', Line_Schedule);