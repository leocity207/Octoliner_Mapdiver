import Right_Panel from "./right-panel.js";

/**
 * The Line panel is here to display iformation about a line. mainly its base cadencing parcours time and the served station
 * 
 * Structure
 * ---------
 * 
 * TODO
 */
class Line_Panel extends Right_Panel {
	constructor() {
		super();
	}

	/**
	 * Creates and initializes a Line_Panel instance.
	 * @returns {Line_Panel} A new instance of Line_Panel.
	 */
	static Create() {
		const Line_Panel = document.createElement("right-panel");
		Line_Panel.Init();
		return Line_Panel;
	}
}

// Define the custom element
customElements.define("Line-panel", Line_Panel);

export default Line_Panel;
