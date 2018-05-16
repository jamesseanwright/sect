import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';
import { KeyboardInteractable } from '@tecs/input';
import { LinearCollidable } from '@tecs/collision';
import Moveable from '../movement/Moveable';

class Bounceable extends Component {
    private _positionable: Positionable;
    private _moveable: Moveable;
    private _linearCollidable: LinearCollidable;

    constructor(positionable: Positionable, moveable: Moveable, linearCollidable: LinearCollidable) {
        super();
        this._positionable = positionable;
        this._moveable = moveable;
        this._linearCollidable = linearCollidable;
    }

    public get positionable(): Positionable {
        return this._positionable;
    }

    public get moveable(): Moveable {
        return this._moveable;
    }

    public get linearCollidable(): LinearCollidable {
        return this._linearCollidable;
    }
}

export default Bounceable;
