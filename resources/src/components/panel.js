import Sticky_Header from "./sticky_header.js";
import Switch_Event from "./switch.js";
import Utils from "/src/utils/utils.js";

/**
 * The **Base Panel** is a user interface element that remains fixed on the base side of the screen.  
 * It can be toggled on or off to show or hide its contents and provides various interactive options.
 * 
 * Structure
 * ---------
 *
 */
export default class Base_Panel extends HTMLElement {

	/**
	 * Indicates whether the base panel is currently visible or not.
	 */
	panel_visible = false;

	/**
	 * The DOM element representing the base panel.
	 */
	base_panel;

	static template = (() => {
		const template = document.createElement('template');

		const base_panel = document.createElement("div");
		base_panel.classList.add("base-panel");

		template.content.append(base_panel)
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.Render();
	}

	Render() {
		Utils.Empty_Node(this.shadowRoot);
		this.shadowRoot.appendChild(document.importNode(Base_Panel.template.content, true));
		Utils.Add_Stylesheet(this.shadowRoot, "style/base-panel.css");
		Utils.Add_Stylesheet(this.shadowRoot, "resources-config/style/text-font.css");
	}

	/**
	 * Toggles the visibility of the base panel.
	 */
	Toggle_Panel() {
		const base_panel = Utils.Get_Subnode(this.shadowRoot,".base-panel");
		this.panel_visible = !this.panel_visible;
		if (this.panel_visible)
			base_panel.classList.add("open");
		else 
			base_panel.classList.remove("open");	
	}

	/**
	 * Open the panel.
	 */
	Open() {
		const base_panel = Utils.Get_Subnode(this.shadowRoot,".base-panel");
		if(!this.panel_visible)
			base_panel.classList.add("open");
		this.panel_visible = true;
	}

	/**
	 * Close the panel.
	 */
	Close() {
		const base_panel = Utils.Get_Subnode(this.shadowRoot,".base-panel");
		if(this.panel_visible)
			base_panel.classList.remove("open");
		this.panel_visible = false;
	}
}

// Define the custom element
customElements.define("base-panel", Base_Panel);