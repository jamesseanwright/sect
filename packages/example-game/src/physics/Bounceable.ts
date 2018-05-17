import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';
import { KeyboardInteractable } from '@tecs/input';
import { LinearCollidable } from '@tecs/collision';
import ConstantMoveable from '../movement/ConstantMoveable';

class Bounceable extends Component {
    private _constantMoveable: ConstantMoveable;
    private _linearCollidable: LinearCollidable;

    constructor(constantMoveable: ConstantMoveable, linearCollidable: LinearCollidable) {
        super();
        this._constantMoveable = constantMoveable;
        this._linearCollidable = linearCollidable;
    }

    public get constantMoveable(): ConstantMoveable {
        return this._constantMoveable;
    }

    public get linearCollidable(): LinearCollidable {
        return this._linearCollidable;
    }
}

export default Bounceable;
