// line-schedule.js
import Line_Station from './line-station.js';
import Utils from "/src/utils/utils.js" 

/**
 * The **Ligne schedule** is an object used to display schedule information about a line.
 * 
 * Structure
 * ---------
 * 
 *	<div class='schedule-item'>
 *		<div class='schedule-header'>
 *			* Schedule title
 *			* Icon if schedule has information
 *			* Plus_Minus_Button to acces details
 *		</div>
 *		<div class='schedule-details'>
 *			* list of stations
 *		</div>
 *	</div>
 */
export default class Line_Schedule extends HTMLElement {

	/**
	 * Data about the schedule
	 */
	schedule_data = null;

	/**
	 * all data about stations
	 */
	stations_data = null;

	/**
	 * Base template strucutre
	 */
	static template_base =(() =>{
		const template = document.createElement('template');
		const container = Utils.Create_Element_With_Class('div', 'schedule-item');
		const header = Utils.Create_Element_With_Class('div','schedule-header');
		const details = Utils.Create_Element_With_Class('div','schedule-details');

		container.append(header, details);
		template.content.append(container);
		return template;
	})()

	/**
	 * SVG to diplay information
	 */
	static template_info = (() => {
		const template = document.createElement('template');
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
		template.content.append(info_icon);
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		Utils.Add_Stylesheet(this.shadowRoot, "style/line-schedule.css");
		Utils.Clone_Node_Into(this.shadowRoot,Line_Schedule.template_base);	
	}

	/**
	 * Factory to create the Node
	 * @param {Object} schedule_data  information about the line-schedule
	 * @param {Object} stations_data  information about all stations
	 * @returns instance of Line_Schedule
	 */
	static Create(schedule_data, stations_data) {
		const object = document.createElement('line-schedule');
		object.schedule_data = schedule_data;
		object.stations_data = stations_data;
		return object;
	}

	/**
	 * Called when node is connected to the DOM
	 */
	connectedCallback() {
		this.Render();
	}

	/**
	 * Render the line-schedule
	 * change the title name and load the stations for the schedule
	 */
	Render() {
		const header = Utils.Get_Subnode(this.shadowRoot,'.schedule-header');
		const details = Utils.Get_Subnode(this.shadowRoot,'.schedule-details');

		Utils.Empty_Node(header);
		Utils.Empty_Node(details);

		header.textContent = this.schedule_data.label;
		if (this.schedule_data.infomessages?.length)
			Utils.Clone_Node_Into(header,Line_Schedule.template_schedules);
		header.addEventListener('click', () => {
			details.classList.toggle('open');
		});

		this.schedule_data.lineflowstops.forEach(stop_object => {
			stop_object.parent = this.schedule_data;
			details.appendChild(Line_Station.Create(stop_object,this.stations_data));
		});
	}
}

customElements.define('line-schedule', Line_Schedule);