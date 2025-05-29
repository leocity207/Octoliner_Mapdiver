import Utils from "/src/utils/utils.js";

/**
 * The **Base Panel** is a user interface element that remains fixed on the base side of the screen.  
 * It can be toggled on or off to show or hide its contents and provides various interactive options.
 * 
 * Structure
 * ---------
 *	<div class='base-panel'> 
 *	</div>
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
	base_panel = null;

	/**
	 * Base template strucutre
	 */
	static template = (() => {
		const template = document.createElement('template');
		const base_panel = Utils.Create_Element_With_Class('div', 'base-panel');
		template.content.append(base_panel)
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		Utils.Add_Stylesheet(this.shadowRoot, "style/base-panel.css");
		Utils.Clone_Node_Into(this.shadowRoot, Base_Panel.template);
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