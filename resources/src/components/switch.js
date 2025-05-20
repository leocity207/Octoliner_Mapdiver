import Observable from "/src/utils/Observable.js";
import Toggleable from "/src/utils/toggleable.js";
import MixHTMLElementWith from "/src/utils/MixHTMLElement.js";

/**
 * The **Switch_Event** is a UI component that can hold two states and triggers an event when toggled by the user.
 * 
 * Functionality
 * -------------
 * 
 * - Can switch between **two states** (e.g., ON/OFF, Enabled/Disabled).
 * - Sends an **event notification** whenever the state changes.
 */
class Switch_Event extends MixHTMLElementWith(Observable, Toggleable) {

	/**
	 * text to be displayed on the left of the Switch
	 */
	m_text

	/**
	 * Base template for the round cross wich contain the circle and the cross
	 */
	static template = (() => {
		const template = document.createElement('template');

		// add stylesheet
		const style_link = document.createElement("link");
		style_link.setAttribute("rel", "stylesheet");
		style_link.setAttribute("href", "style/switch.css");
		template.content.appendChild(style_link);

		const master_switch = document.createElement("div");
		master_switch.classList.add("switch-container");

		const text_elt = document.createElement("text");

		const label_switch = document.createElement("label");
		label_switch.classList.add("switch");

		const input_checkbox = document.createElement("input");
		input_checkbox.setAttribute("type", "checkbox");

		const span_checkbox = document.createElement("span");
		span_checkbox.classList.add("slider");

		label_switch.append(input_checkbox, span_checkbox);
		master_switch.append(text_elt, label_switch);
		template.content.appendChild(master_switch);
		return template;
	})();

	constructor() {
		super();

		this.m_text = "";
		this.attachShadow({ mode: "open" });
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
		elt.m_text = text;
		return elt;
	}

	/**
	* Called when node is connected to the dom
	*/
	connectedCallback() {
		this.Render();
		const checkbox = this.shadowRoot.querySelector("input[type='checkbox']");
		if (checkbox) {
			checkbox.addEventListener("click", this._handleClick.bind(this));
		}
	}

	/**
	 * Called when node disapear from the dom
	 */
	disconnectedCallback() {
		const checkbox = this.shadowRoot.querySelector("input[type='checkbox']");
		if (checkbox) {
			checkbox.removeEventListener("click", this._handleClick.bind(this));
		}
	}

	/**
	 * Render the node add styles and 
	 */
	Render() {
		// Clear existing content
		while (this.shadowRoot.firstChild)
			this.shadowRoot.removeChild(this.shadowRoot.firstChild);

		let node = document.importNode(Switch_Event.template.content,true);
		const text_elt = node.querySelector("text");
		if (text_elt)
			text_elt.textContent = this.m_text;
		else
			throw Error("Could not find text element inside the switch");
		this.shadowRoot.appendChild(node);
	}

	_handleClick(event) {
		event.stopPropagation(); // (optionnel) évite que le clic remonte inutilement
		this.Next_State();
		this.Emit(this.Get_State());
	}
}

// Define the custom element
customElements.define("switch-event", Switch_Event);

export default Switch_Event;