class ChatMessage extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });

        const template = `
            <style>
                :host {
                    font-family: sans-serif;
                    color: #FFF;
                    font-size: 14px;
                    font-weight: 100;
                }
                .message {
                    border-radius: 3px;
                    background-color: #2D2C2C;
                    padding: 10px 20px;
                    width: fit-content;
                    max-width: 658px;
                }

                .timestamp {
                    font-size: 12px;
                    padding-bottom: 5px;
                    font-weight: 100;
                }

                .timestamp__name {
                    color: #c8c6c4;
                    margin-right: 5px;
                }

                .timestamp__time {
                    color: #8a8886;
                }

                .message__text {
                    margin: 0;
                }
            </style>
            <div class="message">
                <div class="timestamp">
                    <span class="timestamp__name">Nelsson-Smith, Josh</span>
                    <span class="timestamp__time">11:11</span>
                </div>
                <p class="message__text">Some text</p>
            </div>
        `;

        this._shadowRoot.innerHTML = template;
    }

    connectedCallback() {}

    disconnectedCallback() {}

    static get observedAttributes() {}

    attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('chat-message', ChatMessage);