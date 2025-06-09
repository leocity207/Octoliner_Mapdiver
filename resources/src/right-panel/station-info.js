import Line_Schedule from './line-schedule.js';
import Round_Cross from '../components/round-cross.js';
import Utils from '/src/utils/utils.js';

/**
 * The **Station_Info** is an object used to display station schedule information.
 *
 * Structure
 * ---------
 * .. code-block:: html
 *
 *  <div class='station-info'>
 *    <div class='station-header'>
 *      <div class='station-title'>Station Name</div>
 *      <round-cross>
 *    </div>
 *    <div class='station-subtitle'>
 *      Liaisons grandes lignes directes
 *      Station → Toutes les directions
 *    </div>
 *    <div class='schedules'>
 *      * list of schedules
 *    </div>
 *  </div>
 */
class Station_Info extends HTMLElement {

	/**
	 * Data about the station
	 */
	station_data = null;

	/**
	 * Base template structure
	 */
	static template_base = (() => {
		const template = document.createElement('template');
		const container = Utils.Create_Element_With_Class('div', 'station-info');

		// header
		const header = Utils.Create_Element_With_Class('div', 'station-header');
		const title = Utils.Create_Element_With_Class('div', 'station-title');
		header.append(title, Round_Cross.Create("right-panel-cross"));

		// subtitle
		const subtitle = Utils.Create_Element_With_Class('div', 'station-subtitle');

		// schedules
		const schedules = Utils.Create_Element_With_Class('div', 'schedules');

		container.append(header, subtitle, schedules);
		template.content.append(container);
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		Utils.Clone_Node_Into(this.shadowRoot, Station_Info.template_base);
		Utils.Add_Stylesheet(this.shadowRoot, 'style/station-info.css');
	}

	/**
	 * Factory to create the node
	 * @param {Object} station_data the station data
	 * @returns instance of Station_Info
	 */
	static Create(station_data) {
		const object = document.createElement('station-info');
		object.station_data = station_data;
		return object;
	}

	/**
	 * Called when node is connected to the DOM
	 */
	connectedCallback() {
		this.Render();
	}

	/**
	 * Render the station info
	 */
	Render() {
		const title_node = Utils.Get_Subnode(this.shadowRoot, '.station-title');
		title_node.textContent = this.station_data.station.label;

		const subtitle_node = Utils.Get_Subnode(this.shadowRoot, '.station-subtitle');
		subtitle_node.textContent = `Liaisons grandes lignes directes\n${this.station_data.station.label} → Toutes les directions`;

		const schedules_node = Utils.Get_Subnode(this.shadowRoot, '.schedules');
		Utils.Empty_Node(schedules_node);
		this.station_data.station.lines.forEach(line_ID => {
			this.station_data.lines[line_ID].timetable_pattern.forEach(schedule => {
				schedule.parent = this.station_data.lines[line_ID];
				schedules_node.appendChild(Line_Schedule.Create(schedule, this.station_data.stations, this.station_data.station.code));
			})
		});
	}
}

customElements.define('station-info', Station_Info);

export default Station_Info;