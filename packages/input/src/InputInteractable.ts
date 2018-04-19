import { Component } from '@tecs/core';
import Keyboard from './Keyboard';
import Input from './Input';

export type SupportedInput = Input<string | boolean>;

class InputInteractable<T extends SupportedInput> extends Component {
    protected _input: T;

    constructor(input: T) {
        super();
        this._input = input;
    }
}

export default InputInteractable;
