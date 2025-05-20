import { Subject, filter } from "../../libraries/RxJS_wrapper.js";

/**
 * Observable enables event-based communication using RxJS.
 */
export default class Observable {

	/**
	 * The main subject to send event to
	 */
	static s_subject = new Subject();

	/**
	 * The name of the Observable represent the name of the event.
	 * Note: be carefull that each name should be unique and should behave like a symbole.
	 */
	m_name;

	/**
	 * Initialize the observable 
	 * @param {Symbole} name - name of the observable
	 */
	Observable_Init(name) 
	{
		this.m_name = name;
	}

	/**
	 * Emit an event.
	 * @param {Object} data - The event data.
	 */
	Emit(data) {
		this.constructor.s_subject.next({ name: this.m_name, data: data});
	}

	/**aa
	 * Get a filtered observable by name.
	 * @param {string} name
	 * @returns {Observable}
	 */
	static Get_Observable(name) {
		return this.s_subject.pipe(filter(event => event.name === name));
	}
}