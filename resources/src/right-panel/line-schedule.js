// line-schedule.js
import Line_Station from './line-station.js';
import Utils from "/src/utils/utils.js"
import Fold_Plus_Minus from '/src/components/fold-plus-minus.js';

/**
 * The **Ligne schedule** is an object used to display schedule information about a line.
 * 
 * Structure
 * ---------
 * .. code-block:: html
 * 
 * 	<div class='schedule-item'>
 * 		<div class='schedule-header'>
 * 			* Schedule title
 * 			* Icon if schedule has information
 * 			* Plus_Minus_Button to acces details
 * 		</div>
 * 		<div class='schedule-details'>
 * 			* list of stations
 * 		</div>
 * 	</div>
 */
class Line_Schedule extends HTMLElement {

	/**
	 * Data about the schedule
	 */
	schedule_data = null;

	/**
	 * all data about stations
	 */
	stations_data = null;

	/**
	 * the station of reference if null the first station is the reference station
	 */
	reference_station = null;


	/**
	 * Base template strucutre
	 */
	static template_base =(() =>{
		const template = document.createElement('template');
		const container = Utils.Create_Element_With_Class('div', 'schedule-item');

		const header = Utils.Create_Element_With_Class('div','schedule-header');
		const details = Utils.Create_Element_With_Class('div','schedule-details');

		// Left container
		const header_left = Utils.Create_Element_With_Class('div', 'header-left');
		const header_left_icon = Utils.Create_Element_With_Class('div', 'header-left-icon');
		const header_left_title = Utils.Create_Element_With_Class('div', 'header-left-text');
		header_left.append(header_left_icon, header_left_title);

		// Fold_Plus_Minus
		const header_right = Utils.Create_Element_With_Class('div', 'header-right');
		const fold = Fold_Plus_Minus.Create(); 
		const header_minute = Utils.Create_Element_With_Class('div', 'header-minute');
		const header_info_icon = Utils.Create_Element_With_Class('div', 'header-icon');
		header_right.append(header_info_icon, header_minute, fold);

		// Info icon
		const svg_ns = 'http://www.w3.org/2000/svg';
		const info_icon = document.createElementNS(svg_ns, 'svg');
		info_icon.setAttribute('class', 'schedule-info-icon');
		info_icon.setAttribute('viewBox', '0 0 20 20');

		const circle = document.createElementNS(svg_ns, 'rect');
		circle.setAttribute('x', '0');
		circle.setAttribute('y', '0');
		circle.setAttribute('rx', '5');
		circle.setAttribute('ry', '5');
		circle.setAttribute('width', '20');
		circle.setAttribute('height', '20');
		circle.setAttribute('fill', '#888');

		const text = document.createElementNS(svg_ns, 'text');
		text.setAttribute('x', '10');
		text.setAttribute('y', '15');
		text.setAttribute('text-anchor', 'middle');
		text.setAttribute('font-size', '15');
		text.setAttribute('fill', '#fff');
		text.textContent = 'i';
		header_info_icon.appendChild(info_icon)

		info_icon.append(circle, text);

		header.append(header_left, header_right);

		container.append(header, details);
		template.content.append(container);
		return template;
	})()

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
	static Create(schedule_data, stations_data, reference_station) {
		const object = document.createElement('line-schedule');
		object.schedule_data = schedule_data;
		object.stations_data = stations_data;
		object.reference_station = reference_station;
		return object;
	}

	/**
	 * Called when node is connected to the DOM
	 */
	connectedCallback() {
		this.Render();
		this.addEventListener('click', () => {
			Utils.Get_Subnode(this.shadowRoot,'.schedule-details').classList.toggle('open');
			Utils.Get_Subnode(this.shadowRoot,'plus-minus').Next_State();

		});
	}

	/**
	 * Called when node is disconected from the DOM
	 */
	disconnectedCallback() {
		this.removeEventListener("click",() => {
			Utils.Get_Subnode(this.shadowRoot,'.schedule-details').classList.toggle('open');
		});
	}

	/**
	 * Render the line-schedule
	 * change the title name and load the stations for the schedule
	 */
	Render() {
		const header_title = Utils.Get_Subnode(this.shadowRoot,'.header-left-text');
		const header_minute = Utils.Get_Subnode(this.shadowRoot,'.header-minute');
		const details = Utils.Get_Subnode(this.shadowRoot,'.schedule-details');
		const header_left_icon = Utils.Get_Subnode(this.shadowRoot,'.header-left-icon');
		const header_info_icon = Utils.Get_Subnode(this.shadowRoot,'.header-icon');

		Utils.Empty_Node(details);
		if (!this.schedule_data.infomessages?.length)
			header_info_icon.style.display = 'none';
		header_title.textContent = this.schedule_data.label;
		header_minute.textContent = ":" + String(this.schedule_data.departure_minute).padStart(2, '0');
		fetch("src/../resources-config/image/service/" + this.schedule_data.service + ".svg")
			.then(icon => icon.text())
			.then(svg => header_left_icon.innerHTML = svg);

		const stops = this.schedule_data.lineflowstops;
		let referenceIndex = stops.findIndex(stop => stop.station_ID === this.reference_station);

		// Reference station not found – fallback to index 0
		if (referenceIndex === -1)
			referenceIndex = 0;

		const baseMinute = stops[referenceIndex].arrival_minute;

		// Add the first station as Gray_Station if it's not the reference
		if (referenceIndex > 0) {
			const firstStop= {
				...stops[0],
				departure_minute: stops[0].departure_minute - baseMinute,
				flags: [...(stops[0].flags || [])],
				parent: this.schedule_data
			};
			firstStop.flags.push("gray")
			const gray = Line_Station.Create(firstStop, this.stations_data);
			details.appendChild(gray);
		}

		//if (referenceIndex > 1) {
		//	details.appendChild(Blank_Station.Create());
		//}

		// Add visible stations from reference onward
		stops.slice(referenceIndex).forEach(originalStop => {
			const stop_object = {
				...originalStop,
				flags: [...(originalStop.flags || [])],
				arrival_minute: originalStop.arrival_minute !== null ? originalStop.arrival_minute - baseMinute : null,
				departure_minute: originalStop.departure_minute !== null ? originalStop.departure_minute - baseMinute : null,
				parent: this.schedule_data
			};

			details.appendChild(Line_Station.Create(stop_object, this.stations_data));
		});
	}
}

customElements.define('line-schedule', Line_Schedule);

export default Line_Schedule;