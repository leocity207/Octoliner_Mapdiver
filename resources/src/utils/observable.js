import { Subject, filter } from "../../libraries/RxJS_wrapper.js";

/**
 * Observable enables event-based communication using RxJS.
 */


export default class Observable {
	static subject = new Subject();

	/**
	 * Emit an event.
	 * @param {Object} data - The event data.
	 */
	Emit(data) {
		this.constructor.subject.next(data);
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
