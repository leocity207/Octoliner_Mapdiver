import Observable from "/src/utils/Observable.js";
import MixHTMLElementWith from "/src/utils/MixHTMLElement.js";
import Utils from "/src/utils/utils.js"

/**
 * Hamburger emits an event when clicked.
 * Structure
 * ---------
 *	<div class='hamburger'> 
 *		<div class='bar bar1'>
 *		<div class='bar bar2'>
 *		<div class='bar bar3'>
 *	</div>
 */
export default class Hamburger extends MixHTMLElementWith(Observable) {

	/**
	 * Base template strucutre
	 */
	static template = (() => {
		const template = document.createElement('template');

		const hamburger = Utils.Create_Element_With_Class('div','hamburger');

		const bar1 = Utils.Create_Element_With_Class('div','bar');
		const bar2 = Utils.Create_Element_With_Class('div','bar');
		const bar3 = Utils.Create_Element_With_Class('div','bar');

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
		Utils.Add_Stylesheet(this.shadowRoot, "style/hamburger.css");
		Utils.Clone_Node_Into(this.shadowRoot, Hamburger.template);	
	}

	/**
	 * Factory cronstructor of Round_Cross
	 * @param {Symbol} name 
	 * @returns instance of Round_Cross
	 */
	static Create(name) {
		let object = document.createElement("hamburger-button");
		object.Observable_Init(name);
		return object;
	}

	/**
	 * Called when node is connected to the DOM
	 */
	connectedCallback() {
		this.Observable_connectedCallback();

		this.addEventListener("click", () => {
			Utils.Get_Subnode(this.shadowRoot,".hamburger").classList.toggle("active");
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
}

customElements.define("hamburger-button", Hamburger);
