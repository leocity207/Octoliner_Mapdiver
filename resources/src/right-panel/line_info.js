// line-info.js
import Line_Schedule from './line-schedule.js';
import Round_Cross from '../components/round-cross.js';

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
	constructor() {
		super();
		this.shadow_root = this.attachShadow({ mode: 'open' });

		// CSS externe
		const style_link = document.createElement("link");
		style_link.setAttribute("rel", "stylesheet");
		style_link.setAttribute("href", "style/line-info.css");
		this.shadow_root.appendChild(style_link);

		this.container = document.createElement('div');
		this.container.classList.add('line-info');
		this.shadow_root.appendChild(this.container);

		this.data = null;
	}

	/**  
	 * @param {Object} data = line_data
	 */
	static Create(data) {
		const el = document.createElement('line-info');
		el.data = data;
		el.Render();
		return el;
	}

	/**
	 * Render the while line data to the screen
	*/
	Render() {
		if (!this.data) return;

		this.container.innerHTML = '';

		this.Render_Header(this.data.lines);
		this.Render_Info_Messages(this.data.lines.infomessages);
		this.Render_Schedules(this.data.lines.timetable_pattern,this.data.stations);
	}

	/**
	 * render the title header of the line
	 * @param {Object} line_data 
	 */
	Render_Header(line_data) {
		const header = document.createElement('div');
		header.classList.add('line-header');

		const icon_wrap = document.createElement('div');
		icon_wrap.classList.add('line-logo');
		icon_wrap.innerHTML = line_data.svg_icon;
		const rect = icon_wrap.querySelector('rect');

		if (rect) {
			rect.setAttribute('fill', line_data.color.default);
		} else {
			console.warn('No <rect> element found in SVG.');
		}

		// 4. Add the cloned group and render

		const title = document.createElement('div');
		title.classList.add('line-title');
		title.textContent = "Ligne " + line_data.label;

		header.append(icon_wrap, title, Round_Cross.Create("right-panel-cross"));
		this.container.appendChild(header);
	}

	/**
	 * Render info message that are below the tittle
	 * @param {Infomessages} messages 
	 * @returns 
	 */
	Render_Info_Messages(messages = []) {
		if (!messages.length) return;
		const info_wrap = document.createElement('div');
		info_wrap.classList.add('line-infomessages');
		messages.forEach(msg => {
			const p = document.createElement('p');
			p.classList.add('infomessage');
			p.textContent = msg.text.fr;
			info_wrap.appendChild(p);
		});
		this.container.appendChild(info_wrap);
	}

	/**
	 * Render all the schedules of the line
	 * @param {Object} schedules 
	 */
	Render_Schedules(schedules = [],stations) {
		const sched_wrap = document.createElement('div');
		sched_wrap.classList.add('schedules');

		schedules.forEach(sch => {
			sch.parent = this.data.lines;
			sched_wrap.appendChild(Line_Schedule.Create(sch, stations));
		});

		this.container.appendChild(sched_wrap);
	}
}

customElements.define('line-info', Line_Info);