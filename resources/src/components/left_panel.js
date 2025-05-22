import Base_Panel from "./panel.js";
import Switch_Event from "./switch.js";
import Hamburger from "./hamburger.js";
import Utils from "/src/utils/utils.js";


/**
 * The **Left Panel** is a user interface element that remains fixed on the left side of the screen.  
 * It can be toggled on or off to show or hide its contents and provides various interactive options.
 * 
 * Structure
 * ---------
 * 
 * The left panel consists of two main components:
 * 
 * - **Title and Subtitle**: Provides instructions or context for users.
 * - **Options**: Allows users to modify characteristics of the map.
 */
export default class Left_Panel extends Base_Panel {

	static template = (() => {
		const template = document.createElement('template');

		//this.base_panel.classList.add("left");

		const title = document.createElement("div");
		title.classList.add("title");
		title.innerHTML = "Liaisons grandes lignes directes";

		const subtitle = document.createElement("div");
		subtitle.classList.add("text");
		subtitle.innerHTML = "Sélectionnez votre ligne/gare de départ sur la carte ou utilisez le champ de saisie";

		const title_option = document.createElement("div");
		title_option.classList.add("title");
		title_option.innerHTML = "Option:";

		const color_switch = Switch_Event.Create("color", "Simple color");

		template.content.append(title, subtitle, title_option, color_switch);
		return template;
	})();

	/**
	 * Creates and initializes a Left_Panel instance.
	 * @returns {Left_Panel} A new instance of Left_Panel.
	 */
	static Create() {
		return document.createElement("left-panel");
	}

	connectedCallback() {
		this.Render();
		Hamburger.Get_Observable("left-panel-hamburger").subscribe(() => this.Toggle_Panel());
	}

	disconnectedCallback() {
		Hamburger.Get_Observable("left-panel-hamburger").unsubscribe();
	}

	Render() {
		super.Render();
		Utils.Add_Stylesheet(this.shadowRoot, "style/left-panel.css");
		Utils.Get_Subnode(this.shadowRoot,".base-panel").classList.add("left");
		Utils.Get_Subnode(this.shadowRoot,".base-panel").appendChild(document.importNode(Left_Panel.template.content,true));
	}
}

// Define the custom element
customElements.define("left-panel", Left_Panel);