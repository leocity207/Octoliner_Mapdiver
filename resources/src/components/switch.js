import { Subject, filter } from "../../libraries/RxJS_wrapper.js";

/**
 * The **Switch_Event** is a UI component that can hold two states and triggers an event when toggled by the user.
 * 
 * Functionality
 * -------------
 * 
 * - Can switch between **two states** (e.g., ON/OFF, Enabled/Disabled).
 * - Sends an **event notification** whenever the state changes.
 */
class Switch_Event extends HTMLElement {

	/**
	 * the observable that listen for switch events
	 */
	static switch_event_subject = new Subject();

	/**
	 * Name identifier of the switch (this is the name to use when you want to subscribe to the event of the switch).s
	 */
	name;

	constructor() {
		super();
	}

	/**
	 * Creates and initializes a Switch_Event instance.
	 * @param {string} name - The identifier for the switch.
	 * @param {string} text - The label text for the switch.
	 * @returns {Switch_Event} A new instance of Switch_Event.
	 */
	static Create(name, text) {
		const switch_event = document.createElement("switch-event");
		switch_event.Init(name, text);
		return switch_event;
	}

	/**
	 * #PROTECTED#
	 * 
	 * Initializes the switch component.
	 * @param {string} name - The identifier for the switch.
	 * @param {string} text - The label text for the switch.
	 */
	Init(name, text) {
		this.name = name;
		this.attachShadow({ mode: "open" });

		const style_link = document.createElement("link");
		style_link.setAttribute("rel", "stylesheet");
		style_link.setAttribute("href", "style/switch.css");
		this.shadowRoot.appendChild(style_link);

		const master_switch = document.createElement("div");
		master_switch.classList.add("switch-container");

		const text_elt = document.createElement("text");
		text_elt.innerHTML = text;

		const label_switch = document.createElement("label");
		label_switch.classList.add("switch");

		const input_checkbox = document.createElement("input");
		input_checkbox.setAttribute("type", "checkbox");

		const span_checkbox = document.createElement("span");
		span_checkbox.classList.add("slider");

		label_switch.appendChild(input_checkbox);
		label_switch.appendChild(span_checkbox);
		master_switch.appendChild(text_elt);
		master_switch.appendChild(label_switch);

		span_checkbox.addEventListener("click", () => {
			Switch_Event.switch_event_subject.next({ name: this.name, state: !input_checkbox.checked });
		});

		this.shadowRoot.appendChild(master_switch);
	}

	/**
	 * Returns an observable that listens for switch events with the specified name.
	 * @param {string} name - The identifier for the switch.
	 * @returns {Observable} An RxJS observable for the switch events. the observable return a dictionary containing the 'name' and 'state' of the switch
	 * 
	 * @example
	 * Switch.Get_Observable('mySwitch')subscribe(event => {
	 *    console.log(`Switch toggled: ${event.name} - ${event.state}`);
	 * });
	 * 
	 */
	static Get_Observable(name) {
		return Switch_Event.switch_event_subject.pipe(filter((event) => event.name === name));
	}
}

// Define the custom element
customElements.define("switch-event", Switch_Event);

export default Switch_Event;