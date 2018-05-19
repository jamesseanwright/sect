import { Component } from '@sectjs/core';
import Keyboard from './Keyboard';
import Input, { SupportedInput } from './Input';

class InputInteractable<T extends SupportedInput> extends Component {
    protected _input: T;

    constructor(input: T) {
        super();
        this._input = input;
    }
}

export default InputInteractable;
