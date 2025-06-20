import Network_Map from "../map/network_map.js";
import Map_Page from "./svg-map-page.js";
import Utils from "/src/utils/utils.js";
import { Config, Network_Config} from "/src/../resources-config/config.js"
import Switch_Event from "/src/components/switch.js";
import Round_Cross from "/src/components/round-cross.js";

/**
 * Network_Map_Station define a node that contain a Network_Map object
 *
 * Map_Page define a custom element named "svg-map-app"
 */
class Network_Map_Page extends Map_Page {

	/**
	 * last event that happend in the form  {type: string, detail: Any};
	 */
	prev_event = null;

	/**
	 * tells wether the panel is open (should be unused)
	 */
	panel_detail_is_open = false;

	/**
	 * data bout the network that is being displayed {Stations: json_data, detail: json_data}
	 */
	network_data = null;

	/**
	 * When the user click on a staion
	 *
	 * @param {Object} event
	 */
	On_Station_CLicked(event) {
		this.map.Highlight_All_Lines_At_Station(event.detail);
		Utils.Get_Subnode(this.shadowRoot, 'right-panel').Open_Station_Info(this.map.Get_Station_Data(event.detail));
		this.map.Zoom_Highlighted_Stations(event.detail);
		this.prev_event = {type: "station", detail: event.detail};
	}

	/**
	 * When the user click on a line
	 *
	 * @param {Object} event
	 */
	On_Line_CLicked(event) {
		this.map.Highlight_Lines([event.detail]);
		Utils.Get_Subnode(this.shadowRoot, 'right-panel').Open_Line_Info(this.map.Get_Line_Data(event.detail));
		this.map.Zoom_Highlighted_Line(event.detail);
		this.prev_event = {type: "line", detail: event.detail};
	}

	/**
	 * When the user go back or deselect the curent station or line
	 *
	 * @param {Object} event
	 */
	On_Pop_State(event) {
		if(event.state) {
			if(event.state.line)
				return this.On_Line_CLicked({detail: event.state.line})
			return this.On_Station_CLicked({detail: event.state.station})
		}
		else {
			Utils.Get_Subnode(this.shadowRoot, 'right-panel').Close();
			if(!this.prev_event.type)
				this.map.Initial_Zoom_Move();
			if(this.prev_event.type === 'station')
				this.map.Reset_Line_Highlight();
			else if(this.prev_event.type === 'line')
				this.map.Reset_Line_Highlight();
			this.prev_event = {type: "back"};
		}
	}

	/**
	 * when the user select a label on the map
	 * @param {Object} label
	 */
	On_Selected_By_Label(label) {
		let solutionKey = Object.keys(this.network_data.stations).find(key => this.network_data.stations[key].label === label);
		if(solutionKey) {
			history.pushState({ station: solutionKey }, "", solutionKey);
			return this.On_Station_CLicked({type: 'station', detail: solutionKey});
		}
		solutionKey = Object.keys(this.network_data.lines).find(key => this.network_data.lines[key].label === label);
		if(solutionKey) {
			history.pushState({ line: solutionKey }, "", solutionKey);
			return this.On_Line_CLicked({type: 'line', detail: solutionKey})
		}
		if(!solutionKey)
			return console.error("No solution found for label " + label);
	}
	/**
	 * Asynchronous function that initialize the map. the function resolve when the SVG is loaded and displayed inside the current node
	 */
	Initialize_Map = async () => {
		// Set variable
		this.prev_event = {type: undefined, detail: undefined};
		this.panel_detail_is_open = false;

		// Bind calback to this
		this.On_Line_CLicked = this.On_Line_CLicked.bind(this);
		this.On_Station_CLicked = this.On_Station_CLicked.bind(this);
		this.On_Pop_State = this.On_Pop_State.bind(this);

		// Link callback
		window.addEventListener("popstate", this.On_Pop_State);
		document.addEventListener("station-click", this.On_Station_CLicked);
		document.addEventListener("line-click", this.On_Line_CLicked);
		// Initialize map
		this.map = new Network_Map("Desktop", "resources-config/image/map.svg", Config, Network_Config);
		await this.map.Setup("Fr", Utils.Get_Subnode(this.shadowRoot, '.map-canvas'));
		this.network_data = await Utils.Fetch_Resource("dyn/network_data")
		this.map.Setup_Mouse_Handlers(this.network_data.lines, this.network_data.stations);

		const labels = Object.values(this.network_data.lines).map(line => line.label).concat(Object.values(this.network_data.stations).map(station => station.label));

		Utils.Get_Subnode(this.shadowRoot, 'sticky-header').Set_Autocomplete_List(labels).subscribe(event => this.On_Selected_By_Label(event.data));
		Switch_Event.Get_Observable("color").subscribe((event) => {
			if(event.data)
				this.map.Change_Color("easy");
			else
				this.map.Change_Color("default");
		});

		Round_Cross.Get_Observable("right-panel-cross").subscribe((event) => {
			history.pushState(null, "", "/");
			this.On_Pop_State({});
		});

		let resizeTimeout;
		this.resize_observer = new ResizeObserver(entries => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				for (let entry of entries) {
					const { width, height } = entry.contentRect;
					this.map.Zoom_Check_Map_Resize(width, height);
				}
			}, 25); //Debounce time
		});
		this.resize_observer.observe(Utils.Get_Subnode(this.shadowRoot, '.map-container'));
	}

	/**
	 * Create a Map_App object and initialize it.
	 *
	 * @returns {Map_App} an Page Object
	 */
	static Create() {
		return document.createElement("network-map-page");
	}
}

customElements.define("network-map-page", Network_Map_Page);

export default Network_Map_Page;