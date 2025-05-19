import Observable from "/src/utils/Observable.js";
import MixHTMLElementWith from "/src/utils/MixHTMLElement.js";

/**
 * Round_Cross emits an event when clicked.
 */
class Round_Cross extends MixHTMLElementWith(Observable) {
	m_name;

	static template_base = (() => {
		const template = document.createElement('template');

		const wrapper = document.createElement("div");
		wrapper.classList.add("circle");

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

	static Create(name) {
		const elt = document.createElement("round-cross");
		elt.m_name = name;
		return elt;
	}

	connectedCallback() {
		this.Render();
		this.addEventListener("click", () => {
			this.Emit({ name: this.m_name });
		});
	}

	disconnectedCallback() {
		this.removeEventListener("click", () => {
			this.Emit({ name: this.m_name });
		});
	}

	Render() {
		// Clear existing content
		while (this.shadowRoot.firstChild)
      		this.shadowRoot.removeChild(this.shadowRoot.firstChild);

		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "style/round-cross.css";
		this.shadowRoot.appendChild(style);

		// Clone and append the template content
		let c = document.importNode(Round_Cross.template_base.content,true);
		this.shadowRoot.appendChild(c);
	}
}

customElements.define("round-cross", Round_Cross);
export default Round_Cross;
