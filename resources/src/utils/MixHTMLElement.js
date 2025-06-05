/**
 * copy all the static methods and static attributes from source to targets (overide existing properties)
 * @param {Class} source the source class to copy static properties from
 * @param {Class} target the target class to copy static properties to
 */
function Copy_Static_Properties(source, target) {
	const keys = [
		...Object.getOwnPropertyNames(source),
		...Object.getOwnPropertySymbols(source),
	];

	for (const key of keys) {
		if (
			key === 'name' ||
			key === 'length' ||
			key === 'prototype' ||
			key === 'caller' ||
			key === 'callee' ||
			key === 'arguments'
		)
			continue; // Skip default and non-copyable properties

		const descriptor = Object.getOwnPropertyDescriptor(source, key);
		Object.defineProperty(target, key, descriptor);
	}
}

/**
 * copy all the methods and attributes from source to targets (overide existing properties)
 * @param {Class} source the source class to copy properties from
 * @param {Class} target the target class to copy properties to
 */
function Copy_Prototype_Properties(sourceProto, targetProto) {
	const keys = [
		...Object.getOwnPropertyNames(sourceProto),
		...Object.getOwnPropertySymbols(sourceProto),
	];

	for (const key of keys) {
		if (key === 'constructor') continue; // Skip the constructor

		const descriptor = Object.getOwnPropertyDescriptor(sourceProto, key);
		Object.defineProperty(targetProto, key, descriptor);
	}
}

/**
 * Do multiple inheritance from all the bases given in argument and the class HTMLElement
 * It should be notted that the leftmost class given in argument inside `bases` while have primoty on all the previous classes given in argument if multiple similar properties exist
 * @param  {...class} bases list of class to inherite properties from
 * @returns a class that you can extends from that have all mixed properties most left class have the last word on properties
 */
function MixHTMLElementWith(...bases) {
	class Base extends HTMLElement {}

	const MixinClass = bases.reduce((BaseClass, Mixin) => {
		class Mixed extends BaseClass {
			constructor(...args) {
				super(...args);
				const mixinInstance = new Mixin(...args);
				// Copy instance properties from the mixin instance to 'this'
				Object.assign(this, mixinInstance);
			}
		}

		// Copy static properties
		Copy_Static_Properties(Mixin, Mixed);

		// Copy prototype properties (instance methods)
		Copy_Prototype_Properties(Mixin.prototype, Mixed.prototype);

		return Mixed;
	}, Base);

	return MixinClass;
}

export default MixHTMLElementWith;