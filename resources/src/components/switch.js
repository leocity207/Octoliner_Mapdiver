import Observable from "/src/utils/Observable.js";
import Toggleable from "/src/utils/toggleable.js";
import MixHTMLElementWith from "/src/utils/MixHTMLElement.js";
import Utils from "/src/utils/utils.js"

/**
 * The **Switch_Event** is a UI component that can hold two states and triggers an event when toggled by the user.
 * 
 * Functionality
 * -------------
 * 
 * - Can switch between **two states** (e.g., ON/OFF, Enabled/Disabled).
 * - Sends an **event notification** whenever the state changes.
 * Structure
 * ---------
 *	<div class="switch-container">
 *		<text> *text of the switch
 *		<label>
 *			<input>
 *			<span> 	
 *		</label>
 *	</div>
 */
export default class Switch_Event extends MixHTMLElementWith(Observable, Toggleable) {

	/**
	 * text to be displayed on the left of the Switch
	 */
	m_text

	/**
	 * Base template for the round cross wich contain the circle and the cross
	 */
	static template = (() => {
		const template = document.createElement('template');

		const master_switch = Utils.Create_Element_With_Class('div', 'switch-container');

		const text_elt = document.createElement("text");
		const label_switch = Utils.Create_Element_With_Class('label','switch');

		const input_checkbox = document.createElement("input");
		input_checkbox.setAttribute("type", "checkbox");
		const span_checkbox = Utils.Create_Element_With_Class('span','slider');
		label_switch.append(input_checkbox, span_checkbox);
		
		master_switch.append(text_elt, label_switch);
		template.content.appendChild(master_switch);
		return template;
	})();

	constructor() {
		super();

		this.m_text = "";
		this.attachShadow({ mode: "open" });
		Utils.Add_Stylesheet(this.shadowRoot, 'style/switch.css')
		Utils.Clone_Node_Into(this.shadowRoot,Switch_Event.template);
		this._handleClick = this._handleClick.bind(this);
	}

	/**
	 * Creates and initializes a Switch_Event instance.
	 * @param {string} name - The identifier for the switch.
	 * @param {string} text - The label text for the switch.
	 * @returns {Switch_Event} A new instance of Switch_Event.
	 */
	static Create(name, text) {
		const elt = document.createElement("switch-event");
		elt.Observable_Init(name);
		elt.Toggleable_Init([false,true],false);
		elt.text = text;
		return elt;
	}

	/**
	* Called when node is connected to the dom
	*/
	connectedCallback() {
		this.Observable_connectedCallback();
		this.Toggleable_connectedCallback();
		const checkbox = this.shadowRoot.querySelector("input[type='checkbox']");
		checkbox.addEventListener("click", this._handleClick.bind(this));
	}

	/**
	 * Called when node disapear from the dom
	 */
	disconnectedCallback() {
		const checkbox = this.shadowRoot.querySelector("input[type='checkbox']");
		checkbox.removeEventListener("click", this._handleClick.bind(this));
	}

	/**
	 * Render the node add styles and 
	 */
	Render() {
		const text_elt = Utils.Get_Subnode(this.shadowRoot,'text');
		text_elt.textContent = this.text;
	}

	/**
	 * Handle the event 
	 * 
	 * @param {Event} event 
	 */
	_handleClick(event) {
		event.stopPropagation(); // (optionnel) évite que le clic remonte inutilement
		this.Next_State();
		this.Emit(this.Get_State());
	}
}

// Define the custom element
customElements.define("switch-event", Switch_Event);