import { Component } from '@sectjs/core';
import { TextRenderable } from '@sectjs/basics';
import StateQueryable from './StateQueryable';

export type ScoreType = 'player' | 'computer'; // TODO: reuse type elsewhere?

class ScoreTracking extends Component {
    private _scoreType: ScoreType;
    private _textRenderable: TextRenderable;
    private _stateQueryable: StateQueryable;

    constructor(scoreType: ScoreType, textRenderable: TextRenderable, stateQueryable: StateQueryable) {
        super();
        this._scoreType = scoreType;
        this._textRenderable = textRenderable;
        this._stateQueryable = stateQueryable;
    }

    public get textRenderable(): TextRenderable {
        return this._textRenderable;
    }

    public get score(): string {
        return this._stateQueryable.getState<string>(`${this._scoreType}Score`);
    }
}

export default ScoreTracking;
