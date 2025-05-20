import Observable from "/src/utils/Observable.js";
import MixHTMLElementWith from "/src/utils/MixHTMLElement.js";

/**
 * Round_Cross emits an event when clicked.
 */
export default class Round_Cross extends MixHTMLElementWith(Observable) {

	/**
	 * Base template for the round cross wich contain the circle and the cross
	 */
	static template = (() => {
		const template = document.createElement('template');

		// Create the main circle
		const wrapper = document.createElement("div");
		wrapper.classList.add("circle");

		// Create the cross
		const left = document.createElement("div");
		left.classList.add("left");

		const right = document.createElement("div");
		right.classList.add("right");

		wrapper.appendChild(left);
		wrapper.appendChild(right);
		template.content.appendChild(wrapper);
		return template;
	})();

	constructor() {
		super();

		this.m_name = "";
		this.attachShadow({ mode: "open" });
	}

	/**
	 * Factory cronstructor of Round_Cross
	 * @param {Symbol} name 
	 * @returns Round_Cross
	 */
	static Create(name) {
		const elt = document.createElement("round-cross");
		elt.Observable_Init(name);
		return elt;
	}

	/**
	 * Called when node is connected to the dom
	 */
	connectedCallback() {
		this.Render();
		this.addEventListener("click", () => {
			this.Emit();
		});
	}

	/**
	 * Called when node disapear from the dom
	 */
	disconnectedCallback() {
		this.removeEventListener("click");
	}

	/**
	 * Render the node add styles and 
	 */
	Render() {
		// Clear existing content
		while (this.shadowRoot.firstChild)
      		this.shadowRoot.removeChild(this.shadowRoot.firstChild);

		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "style/round-cross.css";
		this.shadowRoot.appendChild(style);

		// Clone and append the template content
		this.shadowRoot.appendChild(document.importNode(Round_Cross.template.content,true));
	}
}

customElements.define("round-cross", Round_Cross);