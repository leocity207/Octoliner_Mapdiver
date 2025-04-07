import Sticky_Header from "./sticky_header.js";
import Switch_Event from "./switch.js";

/**
 * The **Base Panel** is a user interface element that remains fixed on the base side of the screen.  
 * It can be toggled on or off to show or hide its contents and provides various interactive options.
 * 
 * Structure
 * ---------
 *
 */
class Base_Panel extends HTMLElement {

	/**
	 * Indicates whether the base panel is currently visible or not.
	 */
	panel_visible = false;

	/**
	 * The DOM element representing the base panel.
	 */
	base_panel;
	constructor() {
		super();
	}

	/**
	 * Creates and initializes a base_Panel instance.
	 * @returns {base_Panel} A new instance of base_Panel.
	 */
	static Create() {
		const panel = document.createElement("base-panel");
		panel.Init();
		return panel;
	}

	/**
	 * Initializes the base panel and its elements.
	 */
	Init() {
		this.attachShadow({ mode: "open" });

		const style_link = document.createElement("link");
		style_link.setAttribute("rel", "stylesheet");
		style_link.setAttribute("href", "style/base-panel.css");

		const font_link = document.createElement("link");
		font_link.setAttribute("rel", "stylesheet");
		font_link.setAttribute("href", "resources-config/style/text-font.css");

		this.shadowRoot.appendChild(style_link);
		this.shadowRoot.appendChild(font_link);

		this.base_panel = document.createElement("div");
		this.base_panel.classList.add("base-panel");

		this.shadowRoot.appendChild(this.base_panel);
	}

	/**
	 * Toggles the visibility of the base panel.
	 */
	Toggle_Panel() {
		this.panel_visible = !this.panel_visible;
		if (this.panel_visible)
			this.base_panel.classList.add("open");
		else 
			this.base_panel.classList.remove("open");	
	}

	Open() {
		if(!this.panel_visible)
			this.base_panel.classList.add("open");
		this.panel_visible = true;
	}

	Close() {
		if(this.panel_visible)
			this.base_panel.classList.remove("open");
		this.panel_visible = false;
	}
}

// Define the custom element
customElements.define("base-panel", Base_Panel);

export default Base_Panel;
