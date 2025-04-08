import { Subject, filter } from "../../libraries/RxJS_wrapper.js";

/**
 * The **round-cross** is an element that looks like a cross within a circle.
 * When clicked, it sends a named event through an observable.
 */
class Round_Cross extends HTMLElement {
    static s_round_cross_subject = new Subject();

    name;

    constructor() {
        super();
    }

    static Create(name) {
        const round_cross = document.createElement("round-cross");
        round_cross.Init(name);
        return round_cross;
    }

    Init(name) {
        this.name = name;
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
            Round_Cross.s_round_cross_subject.next({ name: this.name });
        });

        this.shadowRoot.appendChild(wrapper);
    }

    static Get_Observable(name) {
        return Round_Cross.s_round_cross_subject.pipe(
            filter((event) => event.name === name)
        );
    }
}

customElements.define("round-cross", Round_Cross);
export default Round_Cross;