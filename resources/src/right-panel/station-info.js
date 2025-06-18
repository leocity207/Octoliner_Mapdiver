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

	/**
	 * A direction group header element template
	 */
	static direction_header_template = (() => {
		const template = document.createElement('template');
		const wrapper = Utils.Create_Element_With_Class('div', 'schedule-direction-header');
		const label = Utils.Create_Element_With_Class('span', 'direction-label');
		wrapper.appendChild(label);
		template.content.append(wrapper);
		return template;
	})();

	constructor() {
		super()
		this.attachShadow({ mode: 'open' });
		Utils.Clone_Node_Into(this.shadowRoot, Station_Info.template_base);
		Utils.Add_Stylesheet(this.shadowRoot, 'style/station-info.css');
	}

	/**
	 * Factory to create this component instance
	 * @param {Object} station_data - full data about the station
	 * @returns {Station_Info}
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
	 * Render all grouped schedules and static content
	 */
	Render() {
		this._Render_Title_And_Subtitle();
		this._Render_Grouped_Schedules();
	}

	/**
	 * Update station name and subtitle
	 */
	_Render_Title_And_Subtitle() {
		const title_node = Utils.Get_Subnode(this.shadowRoot, '.station-title');
		const subtitle_node = Utils.Get_Subnode(this.shadowRoot, '.station-subtitle');
		const station_name = this.station_data.station.label;

		title_node.textContent = station_name;
		subtitle_node.textContent = `Liaisons grandes lignes directes\n${station_name} → Toutes les directions`;
	}

	/**
	 * Collect and display schedule groups by direction
	 */
	_Render_Grouped_Schedules() {
		const schedules_node = Utils.Get_Subnode(this.shadowRoot, '.schedules');
		Utils.Empty_Node(schedules_node);

		const direction_map = this._Group_Schedules_By_Direction();

		for (const [direction_code, schedule_group] of direction_map.entries()) {
			const direction_label = this.station_data.stations[direction_code]?.label || direction_code;

			const group_header = Station_Info.direction_header_template.content.cloneNode(true);
			group_header.querySelector('.direction-label').textContent = 'Direction: ' + direction_label;
			schedules_node.appendChild(group_header);

			schedule_group.forEach(schedule => {
				const schedule_node = Line_Schedule.Create(schedule, this.station_data.stations, this.station_data.station.code);
				schedules_node.appendChild(schedule_node);
			})
		}
	}

	/**
	 * Group all schedules by direction code (using schedule.code)
	 * @returns {Map<string, Object[]>}
	 */
	_Group_Schedules_By_Direction() {
		const direction_map = new Map();

		this.station_data.station.lines.forEach(line_ID => {
			const line = this.station_data.lines[line_ID];

			line.timetable_pattern.forEach(schedule => {
				const last_stop = schedule.lineflowstops.at(-1)
				if (last_stop.station_ID === this.station_data.station.code)
					return;

				schedule.parent = line;

				const direction_code = this.station_data.station.direction[schedule.code];
				if (!direction_map.has(direction_code))
					direction_map.set(direction_code, []);

				direction_map.get(direction_code).push(schedule);
			})
		})

		return direction_map;
	}
}

customElements.define('station-info', Station_Info);

export default Station_Info;