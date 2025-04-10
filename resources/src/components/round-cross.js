import { Subject, filter } from "../../libraries/RxJS_wrapper.js";

/**
 * The **round-cross** is an element that looks like a cross within a circle.
 * When clicked, it sends a named event through an observable.
 */
class Round_Cross extends HTMLElement {

	/**
	 * the observable that listen for click on the ``Round_Cross``
	 */
	static s_round_cross_subject = new Subject();

	/**
	 * Name identifier of the cross (this is the name to use when you want to subscribe to the event of the switch).
	 */
	m_name;

	constructor() {
		super();
	}

	/**
	 * Creates and initializes a Round_Cross instance.
	 * @returns {Round_Cross} A new instance of Round_Cross.
	 */
	static Create(name) {
		const round_cross = document.createElement("round-cross");
		round_cross.Init(name);
		return round_cross;
	}

	/**
	 * Initializes the Round cross element.
	 */
	Init(name) {
		this.m_name = name;
		this.attachShadow({ mode: "open" });

		const style_link = document.createElement("link");
		style_link.setAttribute("rel", "stylesheet");
		style_link.setAttribute("href", "style/round-cross.css");
		this.shadowRoot.appendChild(style_link);

		const wrapper = document.createElement("div");
		wrapper.classList.add("circle");

		const cross_left = document.createElement("div");
		cross_left.classList.add("left");

		const cross_right = document.createElement("div");
		cross_right.classList.add("right");

		wrapper.appendChild(cross_left);
		wrapper.appendChild(cross_right);

		wrapper.addEventListener("click", () => {
			Round_Cross.s_round_cross_subject.next({ name: this.m_name });
		});

		this.shadowRoot.appendChild(wrapper);
	}

	/**
	 * @param {String} name of the round cross
	 * @returns The observable that you can catch the event from the named Round_Cross
	 */
	static Get_Observable(name) {
		return Round_Cross.s_round_cross_subject.pipe(
			filter((event) => event.name === name)
		);
	}
}

customElements.define("round-cross", Round_Cross);
export default Round_Cross;