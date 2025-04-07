import Right_Panel from "./right-panel.js";

/**
 * The **Station pael** that display information about the panel like the line passing at this station ad the next trains
 * 
 * Structure
 * ---------
 * 
 * TODO
 */
class Station_Panel extends Right_Panel {
	constructor() {
		super();
	}

	/**
	 * Creates and initializes a Station_Panel instance.
	 * @returns {Station_Panel} A new instance of Station_Panel.
	 */
	static Create() {
		const Station_Panel = document.createElement("right-panel");
		Station_Panel.Init();
		return Station_Panel;
	}
}

// Define the custom element
customElements.define("station-panel", Station_Panel);

export default Station_Panel;