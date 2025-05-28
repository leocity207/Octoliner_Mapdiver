// line-info.js
import Line_Schedule from './line-schedule.js';
import Round_Cross from '../components/round-cross.js';
import Utils from "/src/utils/utils.js" 
import Switch_Event from "/src/components/switch.js";

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
export default class Line_Info extends HTMLElement {

	line_data = null;

	static template_header = (() => {
		const template = document.createElement('template');

		const header = document.createElement('div');
		header.classList.add('line-header');

		const icon_wrap = document.createElement('div');
		icon_wrap.classList.add('line-logo');

		const title = document.createElement('div');
		title.classList.add('line-title');

		header.append(icon_wrap, title, Round_Cross.Create("right-panel-cross"));
		template.content.append(header);
		return template;
	})();

	static template_message = (() => {
		const template = document.createElement('template');

		const info_wrap = document.createElement('div');
		info_wrap.classList.add('line-infomessages');

		template.content.append(info_wrap);
		return template;
	})();

	static template_schedules = (() => {
		const template = document.createElement('template');

		const schedules = document.createElement('div');
		schedules.classList.add('schedules');

		template.content.append(schedules);
		return template;
	})();

	constructor() {
		super();
		this.shadow_root = this.attachShadow({ mode: 'open' });

		this.container = document.createElement('div');
		this.container.classList.add('line-info');
		this.shadow_root.appendChild(this.container);

		Utils.Add_Stylesheet(this.shadowRoot, "style/line-info.css");
	}

	/**  
	 * @param {Object} data = line_data
	 */
	static Create(data) {
		const el = document.createElement('line-info');
		el.line_data = data;
		return el;
	}

	/**
	 * Called when node is connected to the dom
	 */
	connectedCallback() {
		this.Render();
		Switch_Event.Get_Observable("color").subscribe((event) => {
			const rect = Utils.Get_Subnode(this.container,".line-logo").querySelector('rect')
			if(event.data)
				rect.setAttribute('fill', this.line_data.lines.color["easy"]);
			else
				rect.setAttribute('fill', this.line_data.lines.color["default"]);
		});
	}

		/**
	 * Called when node disapear from the dom
	 */
	disconnectedCallback() {
		Switch_Event.Get_Observable("color").unsubscribe();
	}



	/**
	 * Render the while line data to the screen
	*/
	Render() {
		while (this.container.firstChild)
			this.container.removeChild(this.container.firstChild);

		// render template Header
		const header_node = document.importNode(Line_Info.template_header.content,true);
		this.container.appendChild(header_node);
		const line_logo = Utils.Get_Subnode(this.container,".line-logo")
		line_logo.innerHTML = this.line_data.lines.svg_icon;
		const rect = line_logo.querySelector('rect');
		if (rect) 
			rect.setAttribute('fill', this.line_data.lines.color.default);
		else 
			console.warn('No <rect> element found in SVG.');
		const line_text = Utils.Get_Subnode(this.container,".line-title")
		line_text.textContent = "Ligne " + this.line_data.lines.label;

		// render message node if needed
		if(this.line_data.lines.infomessages) {
			const message_node = document.importNode(Line_Info.template_message.content,true);
			this.line_data.lines.infomessages.forEach(msg => {
				const p = document.createElement('p');
				p.classList.add('infomessage');
				p.textContent = msg.text.fr;
				message_node.appendChild(p);
			});
			this.container.appendChild(message_node);
		}
		//render schedule
		const schedules_node = document.importNode(Line_Info.template_schedules.content,true);
		this.line_data.lines.timetable_pattern.forEach(sch => {
			sch.parent = this.line_data.lines;
			schedules_node.appendChild(Line_Schedule.Create(sch, this.line_data.stations));
		});
		this.container.appendChild(schedules_node);
	}
}

customElements.define('line-info', Line_Info);