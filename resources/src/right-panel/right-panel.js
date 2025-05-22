import Base_Panel from "/src/components/panel.js";
import Line_Info from "./line_info.js"
import Utils from "/src/utils/utils.js";

/**
 * The **Right Panel** is a user interface element that remains fixed on the right side of the screen.  
 * It can be toggled on or off to show or hide its contents and provides various interactive options.
 * 
 * Structure
 * ---------
 * 
 * The right panel consists of two main components:
 * 
 * - **Title and Subtitle**: Provides instructions or context for users.
 * - **Options**: Allows users to modify characteristics of the map.
 */
export default class Right_Panel extends Base_Panel {

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
	 * @param {String} line_ID the Id of the line
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
	 * @param {String} Station_ID 
	 */
	Open_Station_Info(Station_ID) {
		this.Open();
	}

	connectedCallback() {
		this.Render();
	}

	Render() {
		super.Render();
		Utils.Add_Stylesheet(this.shadowRoot, "style/right-panel.css");
		Utils.Get_Subnode(this.shadowRoot,".base-panel").classList.add("right");
	}
}

// Define the custom element
customElements.define("right-panel", Right_Panel);