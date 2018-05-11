import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';

class CollisionTarget extends Component {
    private _positionable: Positionable;

    constructor(positionable: Positionable) {
        super();
        this._positionable = positionable;
    }

    public get positionable(): Positionable {
        return this._positionable;
    }
}

export default CollisionTarget;
