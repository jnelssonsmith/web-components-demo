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
                    <span class="timestamp__name"></span>
                    <span class="timestamp__time"></span>
                </div>
                <p class="message__text"></p>
            </div>
        `;

        this._shadowRoot.innerHTML = template;

        this.timeEl = this._shadowRoot.querySelector('.timestamp__time');
        this.messageEl = this._shadowRoot.querySelector('.message__text');
        this.nameEl = this._shadowRoot.querySelector('.timestamp__name');

        this._timeSent = '';
        this._name = '';
        this._message = '';
    }

    connectedCallback() {
        // name, time-sent, message
        if (!this.hasAttribute('name')) {
            this.setAttribute('name', '');
        }

        if (!this.hasAttribute('time-sent')) {
            const d = new Date();
            const timeStr = `${d.getHours()}:${d.getMinutes()}`;
            this.setAttribute('time-sent', timeStr);
        }

        if (!this.hasAttribute('message')) {
            this.setAttribute('message', '');
        }
    }

    disconnectedCallback() {}

    static get observedAttributes() {
        return ['name', 'time-sent', 'message']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'name':
                this._name = newValue;
                break;
            case 'time-sent':
                this._timeSent = newValue;
                break;
            case 'message':
                this._message = newValue;
                break;
            default:
                break;
        }

        this._render();
    }

    _render() {
        if (this.timeEl) {
            this.timeEl.textContent = this._timeSent;
        }

        if (this.messageEl) {
            this.messageEl.textContent = this._message;
        }

        if (this.nameEl) {
            this.nameEl.textContent = this._name;
        }
    }

}

customElements.define('chat-message', ChatMessage);