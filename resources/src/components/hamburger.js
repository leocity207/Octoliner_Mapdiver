import Observable from "/src/utils/Observable.js";
import MixHTMLElementWith from "/src/utils/MixHTMLElement.js";
import Utils from "/src/utils/utils.js"

/**
 * Hamberger emits an event when clicked.
 */
export default class Hamburger extends MixHTMLElementWith(Observable) {

	/**
	 * Base template for the round cross wich contain the circle and the cross
	 */
	static template = (() => {
		const template = document.createElement('template');

		const hamburger = document.createElement("div");
		hamburger.setAttribute("id", "hamburger");

		const bar1 = document.createElement("div");
		const bar2 = document.createElement("div");
		const bar3 = document.createElement("div");

		bar1.classList.add("bar");
		bar2.classList.add("bar");
		bar3.classList.add("bar");

		bar1.classList.add("bar1");
		bar2.classList.add("bar2");
		bar3.classList.add("bar3");

		hamburger.append(bar1, bar2, bar3);
		template.content.append(hamburger);
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	/**
	 * Factory cronstructor of Round_Cross
	 * @param {Symbol} name 
	 * @returns Round_Cross
	 */
	static Create(name) {
		let elt = document.createElement("hamburger-button");
		elt.Observable_Init(name);
		return elt;
	}

	/**
	 * Called when node is connected to the DOM
	 */
	connectedCallback() {
		this.Observable_connectedCallback();

		this.Render();
		this.addEventListener("click", () => {
			Utils.Get_Subnode(this.shadowRoot,"#hamburger").classList.toggle("active");
			this.Emit();
		});
	}

	/**
	 * Called when node disapear from the dom
	 */
	disconnectedCallback() {
		this.removeEventListener("click",() => {
			this.Emit();
		});
	}

	/**
	 * Render the node and styles
	 */
	Render() {
		// Clear existing content
		while (this.shadowRoot.firstChild)
      		this.shadowRoot.removeChild(this.shadowRoot.firstChild);

		Utils.Add_Stylesheet(this.shadowRoot, "style/hamburger.css")

		// Clone and append the template content
		this.shadowRoot.appendChild(document.importNode(Hamburger.template.content,true));
	}
}

customElements.define("hamburger-button", Hamburger);
