// line-info.js
import Line_Schedule from './line-schedule.js';
import Round_Cross from '../components/round-cross.js';
import Utils from "/src/utils/utils.js" 
import Switch_Event from "/src/components/switch.js";

/**
 * The **Ligne info** is an object used to display line information.
 * 
 * Structure
 * ---------
 *	<div class='line-info'>
 *		<div class='line-header'>
 *			<div class='line-logo'>
 *				* containe the lin logo
 *			</div>
 *			<div class='line-title'>
 *				contain the line title
 *			</div>
 *			<round-cross>
 *		</div>
 *		<div class='line-infomessages'>
 *			* list of messages
 *		</div>
 *		<div class='schedules'>
 *			* list of schedules
 *		</div>
 *	</div>
 */
export default class Line_Info extends HTMLElement {

	/**
	 * Data about the schedule
	 */
	line_data = null;

	/**
	 * Base template strucutre
	 */
	static template_base = (() => {
		const template = document.createElement('template');
		const container = Utils.Create_Element_With_Class('div', 'line-info');

		// header
		const header = Utils.Create_Element_With_Class('div', 'line-header');
		const icon_wrap = Utils.Create_Element_With_Class('div', 'line-logo');
		const title =  Utils.Create_Element_With_Class('div', 'line-title');
		header.append(icon_wrap, title, Round_Cross.Create("right-panel-cross"));

		// infos
		const infos = Utils.Create_Element_With_Class('div', 'line-infomessages');

		// schedules
		const schedules = Utils.Create_Element_With_Class('div', 'schedules');

		container.append(header, infos , schedules);
		template.content.append(container);
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		Utils.Clone_Node_Into(this.shadowRoot, Line_Info.template_base)
		Utils.Add_Stylesheet(this.shadowRoot, "style/line-info.css");
	}

	/**
	 * Factory to create the Node
	 * @param {Object} line_data the line data
	 * @returns instance of Line_Info
	 */
	static Create(line_data) {
		const object = document.createElement('line-info');
		object.line_data = line_data;
		return object;
	}

	/**
	 * Called when node is connected to the dom
	 */
	connectedCallback() {
		this.Render();
	}

	/**
	 * Render the line infos.
	 * Change the name and the logo of the line info.
	 * Add message if needed.
	 * Change the schedules
	 * 
	*/
	Render() {
		const line_logo = Utils.Get_Subnode(this.shadowRoot, ".line-logo");
		const line_text = Utils.Get_Subnode(this.shadowRoot, ".line-title");

		// Update line logo
		line_logo.innerHTML = this.line_data.lines.svg_icon;
		const rect = line_logo.querySelector('rect');
		if (rect) 
			rect.setAttribute('fill', this.line_data.lines.color.default);
		else 
			console.warn('No <rect> element found in SVG.');

		// Update line text
		line_text.textContent = "Ligne " + this.line_data.lines.label;

		// Render message node if needed

		const message_node = Utils.Get_Subnode(this.shadowRoot, ".line-infomessages");
		message_node.style.display = 'none';
		Utils.Empty_Node(message_node);
		if(this.line_data.lines.infomessages) {
			this.line_data.lines.infomessages.forEach(msg => {
				const p = document.createElement('p');
				p.classList.add('infomessage');
				p.textContent = msg.text.fr;
				message_node.appendChild(p);
				message_node.style.display = 'block';
			});
		}


		// Render schedule
		const schedules_node = Utils.Get_Subnode(this.shadowRoot, ".schedules");
		Utils.Empty_Node(schedules_node);
		this.line_data.lines.timetable_pattern.forEach(schedule => {
			schedule.parent = this.line_data.lines;
			schedules_node.appendChild(Line_Schedule.Create(schedule, this.line_data.stations));
		});
	}
}

customElements.define('line-info', Line_Info);