import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';
import CollisionTarget from './CollisionTarget';

const toTuple = (key, value) => [key, value] as [typeof key, typeof value];

class LinearCollidable extends Component {
    private _positionable: Positionable;
    private _collisionTargets: Map<CollisionTarget, boolean>;

    constructor(positionable: Positionable, ...collisionTargets: CollisionTarget[]) {
        super();
        this._positionable = positionable;
        this._collisionTargets = new Map(collisionTargets.map(target => toTuple(target, false)));
    }

    public get positionable(): Positionable {
        return this._positionable;
    }

    public get collisionTargets(): IterableIterator<CollisionTarget> {
        return this._collisionTargets.keys();
    }

    public updateCollision(target: CollisionTarget, isColliding: boolean) {
        this._collisionTargets.set(target, isColliding);
    }
}

export default LinearCollidable;
