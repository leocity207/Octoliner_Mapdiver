import Utils from "/src/utils/utils.js" 


const SVG_NS = "http://www.w3.org/2000/svg"


/**
 * The **Ligne station** is an object used to display station information inside a schedule.
 * 
 * Structure
 * ---------
 * 
 * The station node is composed as follow:
 * 
 *	<div class='station-row'>
 *		<div class='station-icon-wrap'>
 *			<svg>
 *				<path>
 *				<circle>
 * 			</svg>
 *		</div>
 *		<div class='station-name'>
 *			* name of the station
 *		</div>
 *	</div>
 */
export default class Line_Station extends HTMLElement {

	/**
	 * data about the schedule
	 */
	station_data = null;

	/**
	 * all data about stations
	 */
	stations_data = null;
	
	/**
	 * For path with a rounded top
	 */
	static start_icon_path = "M0,20 A5,5 0 0 1 10,20 V40 H0 Z";

	/**
	 * Rectangle for station in the middle of the line
	 */
	static middle_icon_path = "M 0,0 H 10 V 40 H 0 Z";

	/**
	 * For path with a rounded corner at the bottom
	 */
	static end_icon_path = "M0,0 H10 V20 A5,5 0 0 1 0,20 Z";


	/**
	 * Base template strucutre
	 */
	static template_base = (() => {
		const template = document.createElement('template');

		//main containers
		const container = Utils.Create_Element_With_Class('div','station-row');

		// icon on the left
		const  icon_wrap = Utils.Create_Element_With_Class('div', 'station-icon-wrap');

		const svg = document.createElementNS(SVG_NS, "svg");
		svg.setAttribute("class", "station-icon-svg");
		svg.setAttribute("viewBox", "0 0 10 40");
		svg.setAttribute("preserveAspectRatio", "none");

		const path = document.createElementNS(SVG_NS, "path");

		const circle = document.createElementNS(SVG_NS, "circle");
		circle.setAttribute("cx", "5");
		circle.setAttribute("cy", "20");
		circle.setAttribute("r", "4");

		svg.append(path, circle);
		icon_wrap.appendChild(svg);

		// station name
		const station_name = Utils.Create_Element_With_Class('span', 'station-name');

		container.append(icon_wrap, station_name)
		template.content.append(container);
		return template;
	})()

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		Utils.Add_Stylesheet(this.shadowRoot, 'style/line-station.css')
		Utils.Clone_Node_Into(this.shadowRoot,Line_Station.template_base);	
	}

	/**
	 * Factory to create the Node
	 * @param {Object} station_data  information about the station
	 * @param {Object} stations_data  information about all the stations in the network
	 * @returns instance of Line_Station
	 */
	static Create(station_data, stations_data) {
		const object = document.createElement('line-station');
		object.station_data = station_data;
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
	 * Render the station
	 * change the path color and type (end/middle/start)
	 * change the staton name
	 */
	Render() {
		const path = Utils.Get_Subnode(this.shadowRoot,'path');
		const station_name = Utils.Get_Subnode(this.shadowRoot,'.station-name');

		// change path attributes
		path.setAttribute("style", `fill: ${this.station_data.parent.parent.color.default};`);
		if(!this.station_data.arrival_minute)
			path.setAttribute("d", Line_Station.start_icon_path);
		else if(!this.station_data.departure_minute)
			path.setAttribute("d", Line_Station.end_icon_path);
		else
			path.setAttribute("d", Line_Station.middle_icon_path);

		// Change station name
		station_name.textContent = this.stations_data[this.station_data.station_ID].label;
	}
}

customElements.define('line-station', Line_Station);