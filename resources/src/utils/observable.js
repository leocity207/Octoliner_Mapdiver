import { Subject, filter } from "rxjs";

/**
 * Observable enables event-based communication using RxJS.
 * you can inherit this class to send Event
 * you can use the class to listen to Event comming from Observable object
 */
class Observable {

	/**
	 * The main subject to send event to
	 */
	static subject = new Subject();

	/**
	 * The name of the Observable represent the name of the event.
	 * Note: be carefull that each name should be unique and should behave like a symbole.
	 */
	name;

	/**
	 * Initialize the observable should be called when the parent is initalized
	 * @param {Symbole} name - name of the observable
	 */
	Observable_Init(name)
	{
		this.name = name;
		this.setAttribute("data-name", this.name)
	}

	/**
	 * This function should be added in inherited class during the connectedCallback function or whenever a copy of the node containing a `Observable` is made
	 */
	Observable_connectedCallback() {
		const nameAttr = this.getAttribute('data-name');
 		if (nameAttr != undefined) this.name = nameAttr;
	}

	/**
	 * Emit an event.
	 * @param {Object} data - The event data.
	 */
	Emit(data) {
		this.constructor.subject.next({ name: this.name, data: data});
	}

	/**
	 * Get a filtered observable by name.
	 * @param {string} name
	 * @returns {Observable}
	 */
	static Get_Observable(name) {
		return this.subject.pipe(filter(event => event.name === name));
	}
}

export default Observable;