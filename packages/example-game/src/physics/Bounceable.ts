import { Positionable } from '@sectjs/basics';
import { Component } from '@sectjs/core';
import { KeyboardInteractable } from '@sectjs/input';
import { LinearCollidable } from '@sectjs/collision';
import ConstantMoveable from '../movement/ConstantMoveable';
import StateQueryable from '../state/StateQueryable';

class Bounceable extends Component {
    private _constantMoveable: ConstantMoveable;
    private _linearCollidable: LinearCollidable;
    private _stateQueryable: StateQueryable;

    constructor(
        constantMoveable: ConstantMoveable,
        linearCollidable: LinearCollidable,
        stateQueryable: StateQueryable,
    ) {
        super();
        this._constantMoveable = constantMoveable;
        this._linearCollidable = linearCollidable;
        this._stateQueryable = stateQueryable;
    }

    public get constantMoveable(): ConstantMoveable {
        return this._constantMoveable;
    }

    public get linearCollidable(): LinearCollidable {
        return this._linearCollidable;
    }

    public get stateQueryable(): StateQueryable {
        return this._stateQueryable;
    }
}

export default Bounceable;
