import Utils from "/src/utils/utils.js"
const SVG_NS = "http://www.w3.org/2000/svg"

/**
 * The **Ligne station** is an object used to display station information inside a schedule.
 *
 * Structure
 * ---------
 * .. code-block:: html
 * 
 * 	<div class='station-row'>
 * 		<div class='times-origin'>
 * 			<span class='origin-time'/>
 * 		</div>
 * 		<div class='times-cadence'>
 * 			<span class='cadence-arrival'/>
 * 			<span class='cadence-departure'/>
 * 		</div>
 * 		<div class='station-icon-wrap'>
 * 			<svg>...</svg>
 * 		</div>
 * 		<div class='station-name'/>
 * 	</div>
 */



class Line_Station extends HTMLElement {

	/**
	 * station data
	 */
	station_data = null;

	/**
	 * station about all the datas
	 */
	stations_data = null;

	/**
	 * start path with rounded corner at the top
	 */
	static start_icon_path = "M0,20 A5,5 0 0 1 10,20 V40 H0 Z";

	/**
	 * middle path that is basicaly a rectangle
	 */
	static middle_icon_path = "M0,0 H10 V40 H0 Z";

	/**
	 * end path with rounded corner at the bottom
	 */
	static end_icon_path = "M0,0 H10 V20 A5,5 0 0 1 0,20 Z";

	/**
	 * Base template strucutre
	 */
	static template_base = (() => {
		const template = document.createElement('template');

		const container = Utils.Create_Element_With_Class('div','station-row');

		// origin time (relative to departure station)
		const timesOrigin = Utils.Create_Element_With_Class('div','times-origin');
		const originTime = Utils.Create_Element_With_Class('span','origin-time');
		timesOrigin.appendChild(originTime);

		// cadence times (relative to cadence baseline)
		const timesCadence = Utils.Create_Element_With_Class('div','times-cadence');
		const arr = Utils.Create_Element_With_Class('span','cadence-arrival');
		const dep = Utils.Create_Element_With_Class('span','cadence-departure');
		timesCadence.append(arr, dep);

		// icon
		const icon_wrap = Utils.Create_Element_With_Class('div', 'station-icon-wrap');
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

		container.append(timesOrigin, timesCadence, icon_wrap, station_name);
		template.content.append(container);
		return template;
	})()

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		Utils.Add_Stylesheet(this.shadowRoot, 'style/line-station.css');
		Utils.Clone_Node_Into(this.shadowRoot,Line_Station.template_base);
	}

	/**
	 * Factory to create the Node
	 * @param {Object} station_data  information about the station as writen inside the line-data
	 * @param {Object} stations_data  information about all stations
	 * @returns instance of Line_Schedule
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
	 * Render the station with dymamic minutes, icon and station title
	 */
	Render() {
		const path = Utils.Get_Subnode(this.shadowRoot,'path');
		const station_name = Utils.Get_Subnode(this.shadowRoot,'.station-name');
		const originTime = Utils.Get_Subnode(this.shadowRoot,'.origin-time');
		const cadenceArr = Utils.Get_Subnode(this.shadowRoot,'.cadence-arrival');
		const cadenceDep = Utils.Get_Subnode(this.shadowRoot,'.cadence-departure');

		// set icon style & shape
		if(this.station_data.flags.includes("gray"))
			path.setAttribute("style", `fill:rgb(161, 161, 161);`);
		else
			path.setAttribute("style", `fill: ${this.station_data.parent.parent.color.default};`);
		const { arrival_minute, departure_minute } = this.station_data;

		const hasArrival = arrival_minute != null;
		const hasDeparture = departure_minute != null;

		if (!hasArrival && hasDeparture)
			path.setAttribute("d", Line_Station.start_icon_path);
		else if (!hasDeparture && hasArrival)
			path.setAttribute("d", Line_Station.end_icon_path);
		else
			path.setAttribute("d", Line_Station.middle_icon_path);
		// origin time (relative to first station)
		originTime.textContent = Utils.Format_Minute(arrival_minute);

		// cadence times: baseline + offset
		const base = this.station_data.parent.departure_minute;

		if (arrival_minute != null) {
			cadenceArr.textContent = Utils.Format_Minute(base + arrival_minute);
			cadenceArr.style.display = "block";
		} else
			cadenceArr.style.display = "none";

		if (departure_minute != null) {
			cadenceDep.textContent = Utils.Format_Minute(base + departure_minute);
			cadenceDep.style.display = "block";
		} else
			cadenceDep.style.display = "none";

		// station name
		station_name.textContent = this.stations_data[this.station_data.station_ID].label;
	}
}

customElements.define('line-station', Line_Station);

export default Line_Station;
