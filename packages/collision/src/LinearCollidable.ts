import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';

const toTuple = (key, value) => [key, value] as [typeof key, typeof value];

class LinearCollidable extends Component {
    private _positionable: Positionable;
    private _collisionTargets: Map<LinearCollidable, boolean>;

    constructor(positionable: Positionable, ...collisionTargets: LinearCollidable[]) {
        super();
        this._positionable = positionable;
        this._collisionTargets = new Map(collisionTargets.map(target => toTuple(target, false)));
    }

    public get positionable(): Positionable {
        return this._positionable;
    }

    public get collisionTargets(): IterableIterator<LinearCollidable> {
        return this._collisionTargets.keys();
    }

    public updateCollision(target: LinearCollidable, isColliding: boolean) {
        if (this._collisionTargets.has(target)) {
            this._collisionTargets.set(target, isColliding);
        }
    }
}

export default LinearCollidable;
