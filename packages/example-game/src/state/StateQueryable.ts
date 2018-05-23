// TODO: move to basics package (rename to foundation?)
import { Component, Game } from '@sectjs/core';

class StateQueryable extends Component {
    private _game: Game;

    constructor(game: Game) {
        super();
        this._game = game;
    }

    public getState<T>(key: string): T {
        return this._game.getState(key);
    }

    public setState<T>(key: string, value: T): void {
        this._game.setState(key, value);
    }
}

export default StateQueryable;
