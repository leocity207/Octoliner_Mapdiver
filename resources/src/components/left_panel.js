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
 * .. code-block:: html
 *
 * 	<div class='base-panel'>
 * 		<div class='title'>
 * 			* main title
 * 		</div>
 * 		<div class='text'>
 * 			* subtext of the title
 * 		</div>
 * 		<div class='title'>
 * 			* main option title
 * 		</div>
 * 		<switch-event data-name="color">
 * 	</div>
 */
class Left_Panel extends Base_Panel {

	/**
	 * Base template strucutre
	 */
	static template = (() => {
		const template = document.createElement('template');

		const title = Utils.Create_Element_With_Class('div','title');
		title.innerHTML = "Liaisons grandes lignes directes";

		const subtitle = Utils.Create_Element_With_Class('div','text');
		subtitle.innerHTML = "Sélectionnez votre ligne/gare de départ sur la carte ou utilisez le champ de saisie";

		const title_option = Utils.Create_Element_With_Class('div','Option');
		title_option.innerHTML = "Option:";

		const color_switch = Switch_Event.Create("color", "Simple color");

		template.content.append(title, subtitle, title_option, color_switch);
		return template;
	})();

	constructor() {
		super();
		Utils.Add_Stylesheet(this.shadowRoot, "style/left-panel.css");
		const base_panel = Utils.Get_Subnode(this.shadowRoot,".base-panel");
		base_panel.classList.add("left");
		Utils.Clone_Node_Into(base_panel, Left_Panel.template);
	}

	/**
	 * Creates and initializes a Left_Panel instance.
	 * @returns {Left_Panel} A new instance of Left_Panel.
	 */
	static Create() {
		return document.createElement("left-panel");
	}

	/**
	 * Called when node is connected to the DOM
	 */
	connectedCallback() {
		Hamburger.Get_Observable("left-panel-hamburger").subscribe(() => this.Toggle_Panel());
	}

	/**
	 * Called when node is disconnected to the DOM
	 */
	disconnectedCallback() {
		Hamburger.Get_Observable("left-panel-hamburger").unsubscribe();
	}
}

// Define the custom element
customElements.define("left-panel", Left_Panel);

export default Left_Panel;