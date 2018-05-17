import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';
import { KeyboardInteractable } from '@tecs/input';
import { LinearCollidable } from '@tecs/collision';
import AutoMoveable from '../movement/AutoMoveable';

class Bounceable extends Component {
    private _autoMoveable: AutoMoveable;
    private _linearCollidable: LinearCollidable;

    constructor(autoMoveable: AutoMoveable, linearCollidable: LinearCollidable) {
        super();
        this._autoMoveable = autoMoveable;
        this._linearCollidable = linearCollidable;
    }

    public get autoMoveable(): AutoMoveable {
        return this._autoMoveable;
    }

    public get linearCollidable(): LinearCollidable {
        return this._linearCollidable;
    }
}

export default Bounceable;
