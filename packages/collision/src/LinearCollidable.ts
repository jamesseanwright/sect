import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';

class LinearCollidable extends Component {
    private _positionable: Positionable;
    private _collisions: LinearCollidable[];

    constructor(positionable: Positionable) {
        super();
        this._positionable = positionable;
        this._collisions = []; // TODO: more efficient way than dynamic array?
    }

    public get positionable(): Positionable {
        return this._positionable;
    }

    public addCollision(target: LinearCollidable): void {
        this._collisions.push(target);
    }

    public removeCollision(target: LinearCollidable): void {
        this._collisions.splice(this._collisions.indexOf(target));
    }

    public hasCollisionWith(target: LinearCollidable): boolean {
        return this._collisions.includes(target);
    }
}

export default LinearCollidable;
