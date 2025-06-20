import Base_Panel from "../components/panel.js";
import Line_Info from "./line_info.js"
import Station_Info from "./station-info.js";
import Utils from "../utils/utils.js";

/**
 * The **Right Panel** is a user interface element that remains fixed on the right side of the screen.
 * It can be toggled on or off to show or hide its contents and provides various interactive options.
 *
 * Structure
 * ---------
 * .. code-block:: html
 *
 * 	<div class='base-panel'>
 * 	</div>
 *
 */
class Right_Panel extends Base_Panel {

	constructor() {
		super();
		Utils.Add_Stylesheet(this.shadowRoot, "style/right-panel.css");
		Utils.Get_Subnode(this.shadowRoot,".base-panel").classList.add("right");
	}

	/**
	 * Creates and initializes a Right_Panel instance.
	 * @returns {Right_Panel} A new instance of Right_Panel.
	 */
	static Create() {
		return document.createElement("right-panel");
	}

	/**
	 * Display the info a line
	 *
	 * @param {object} line_ID object containing data about the line
	 * 		- stations: list of all station on the map
	 * 		- line: line that is being displayed
	 */
	Open_Line_Info = async function(line_data) {
		this.Open();
		let base_panel = Utils.Get_Subnode(this.shadowRoot,".base-panel")
		while (base_panel.firstChild)
			base_panel.removeChild(base_panel.firstChild);
		base_panel.appendChild(Line_Info.Create(line_data));
	}

	/**
	 * Show the info of a station
	 *
	 * @param {object} Station_ID objct containig data about the station
	 * 		- stations: list of all station
	 * 		- station: the station that should be displayed
	 * 		- lines: list of all the lines
	 */
	Open_Station_Info(station_data) {
		this.Open();
		let base_panel = Utils.Get_Subnode(this.shadowRoot,".base-panel")
		while (base_panel.firstChild)
			base_panel.removeChild(base_panel.firstChild);
		base_panel.appendChild(Station_Info.Create(station_data));
	}
}

// Define the custom element
customElements.define("right-panel", Right_Panel);

export default Right_Panel;