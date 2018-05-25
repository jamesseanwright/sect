import { RectPositionable, RectRenderable, TextRenderable } from '@sectjs/basics';
import { ComponentBinder, Game } from '@sectjs/core';
import StateQueryable from '../state/StateQueryable';
import ScoreTracking from '../state/ScoreTracking';

const FONT_FAMILY = 'Arial';
const FONT_SIZE = 20;
const FONT_COLOUR = 'black';

const createHud = (bindComponents: ComponentBinder, game: Game) => {
    const stateQueryable = new StateQueryable(game);
    const playerScorePositionable = new RectPositionable(360, 40, 0, 0);
    const computerScorePositionable = new RectPositionable(440, 40, 0, 0);

    const playerScoreTextRenderable = new TextRenderable(
        game.getState<string>('playerScore'),
        FONT_FAMILY,
        FONT_SIZE,
        playerScorePositionable,
        FONT_COLOUR,
    );

    const computerScoreTextRenderable = new TextRenderable(
        game.getState<string>('computerScore'),
        FONT_FAMILY,
        FONT_SIZE,
        computerScorePositionable,
        FONT_COLOUR,
    );

    const playerScoreTracking = new ScoreTracking('player', playerScoreTextRenderable, stateQueryable);
    const computerScoreTracking = new ScoreTracking('computer', computerScoreTextRenderable, stateQueryable);

    return bindComponents(
        playerScoreTextRenderable,
        playerScoreTracking,
        computerScoreTextRenderable,
        computerScoreTracking,
    );
};

export default createHud;
