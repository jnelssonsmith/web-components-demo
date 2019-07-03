class ChatMessage extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    }

    connectedCallback() {}

    disconnectedCallback() {}

    static get observedAttributes() {}

    attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('chat-message', ChatMessage);