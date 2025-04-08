import Base_Panel from "../components/panel.js";
import Round_Cross from "../components/round-cross.js";

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
class Right_Panel extends Base_Panel {
	constructor() {
		super();
	}

	/**
	 * Creates and initializes a Right_Panel instance.
	 * @returns {Right_Panel} A new instance of Right_Panel.
	 */
	static Create() {
		const Right_panel = document.createElement("right-panel");
		Right_panel.Init();
		return Right_panel;
	}

	/**
	 * Initializes the right panel and its elements.
	 */
	Init() {
		super.Init()

		const style_link = document.createElement("link");
		style_link.setAttribute("rel", "stylesheet");
		style_link.setAttribute("href", "style/right-panel.css");

		this.base_panel.classList.add("right");

		this.shadowRoot.appendChild(style_link);

		this.base_panel.appendChild(Round_Cross.Create("right-panel-cross"));
	}

	Open_Line_Info(line_ID) {
		this.Open();
	}

	Open_Station_Info(Station_ID) {
		this.Open();
	}
}

// Define the custom element
customElements.define("right-panel", Right_Panel);

export default Right_Panel;
