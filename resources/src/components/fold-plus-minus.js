import Toggleable from "/src/utils/toggleable.js";
import MixHTMLElementWith from "/src/utils/MixHTMLElement.js";
import Utils from "/src/utils/utils.js" 

/**
 * Plus_Minus cycles between "plus" and "minus" states visually.
 * Structure
 * ---------
 *	<input>
 *	<div class='circle'>
 *		<div class='horizontal'>
 *		<div class='vertical'>
 *	</div>
 */
export default class Fold_Plus_Minus extends MixHTMLElementWith(Toggleable) {

	/**
	 * Base template strucutre
	 */
	static template = (() => {
		const template = document.createElement('template');

		const input = document.createElement('input');
		input.type = 'checkbox';
		input.id = 'toggle';
		input.hidden = true;

		const wrapper = Utils.Create_Element_With_Class('div','circle');
		const horizontal = Utils.Create_Element_With_Class('div','horizontal');
		const vertical = Utils.Create_Element_With_Class('div','vertical');

		wrapper.append(horizontal, vertical);
		template.content.append(wrapper,input);
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		Utils.Add_Stylesheet(this.shadowRoot, "style/fold-plus-minus.css");
		Utils.Clone_Node_Into(this.shadowRoot, Fold_Plus_Minus.template);	
	}

	/**
	 * Factory to create the Node
	 * @returns instance of Fold_Plus_Minus
	 */
	static Create() {
		let object = document.createElement("plus-minus");
		object.Toggleable_Init([false,true],false);
		return object;
	}

	/**
	 * Called when node is connected to the dom
	 */
	connectedCallback() {
		this.Toggleable_connectedCallback();
	}

	Next_State() {
		super.Next_State();
		this.Check_Symbole();
	}

	Check_Symbole() {
		const symbole = this.shadowRoot.querySelector("div");
		if (symbole) {
			if(symbole.classList.contains("minus")) {
				symbole.classList.remove("minus");
				symbole.classList.add("plus");
			}
			else {
				symbole.classList.remove("plus");
				symbole.classList.add("minus");
			}
		}
	}
}

customElements.define("plus-minus", Fold_Plus_Minus);