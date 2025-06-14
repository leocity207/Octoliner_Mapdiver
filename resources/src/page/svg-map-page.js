import Page from "./page.js";
import SVG_Map from "../map/svg_map.js";
import {Config} from "../../resources-config/config.js"
import Sticky_Header from "/src/components/sticky_header.js"
import LeftPanel from "/src/components/left_panel.js"
import Right_Panel from "/src/right-panel/right-panel.js";
import Utils from "/src/utils/utils.js";

/**
 * Map_App are object that define a node containing a SVG_Map for manipulation and display
 *
 * Map_App define a custom element named "svg-map-app"
 */
class Map_Page extends Page {

	/**
	 * the map object
	 */
	map = null;

	/**
	 * the resizer observer on the map container
	 */
	resize_observer = null;

	/**
	 * Base template strucutre
	 */
	static template_base =(() =>{
		const template = document.createElement('template');
		const sticky_header = Sticky_Header.Create();
		const left_panel = LeftPanel.Create();
		const right_panel = Right_Panel.Create();
		const map_container = Utils.Create_Element_With_Class('div','map-container');
		const map_canvas = Utils.Create_Element_With_Class('canvas','map-canvas');

		map_container.appendChild(map_canvas);

		template.content.append(sticky_header, left_panel, right_panel, map_container);

		return template;
	})();

	constructor() {
		super();
		Utils.Clone_Node_Into(this.shadowRoot, Map_Page.template_base);
	}

	/**
	 * Asynchronous function that initialize the map. the function resolve when the SVG is loaded and displayed inside the current node
	 */
	Initialize_Map = async () => {
		this.map = new SVG_Map("Desktop", "image/map.svg", Config);
		await this.map.Setup("Fr", Utils.Get_Subnode(this.shadowRoot, '.map-canvas'));
		this.map.Setup_Mouse_Handlers();

		this.resize_observer = new ResizeObserver(entries => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect;
				this.map.Zoom_Check_Map_Resize(width, height);
			}
		});
		this.resize_observer.observe(this.map_container);
	}

	/**
	 * create a travling movemont tower the initial object indicated in the conf on the map
	 */
	Initial_Zoom_Move = async () => {
		if(this.map)
			await this.map.Initial_Zoom_Move();
	}

	/**
	 * Create a Map_Page object and initialize it.
	 *
	 * @returns {Map_Page} a Page Object
	 */
	static Create() {
		return document.createElement('svg-map-page');
	}
}

customElements.define("svg-map-page", Map_Page);

export default Map_Page;