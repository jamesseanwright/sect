abstract class Input<TKey> {
    protected _pressBindings: Map<TKey, boolean>;

    constructor() {
        this._pressBindings = new Map();
    }
}

export default Input;
