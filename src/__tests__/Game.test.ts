import { expect } from 'chai';
import Game from '../Game';

describe('Game', function () {
    describe('game state', function () {
        it('should allow access to a state property by key', function () {
            const game = new Game();
            const expectedScore = 100;

            game.setState<number>("score", expectedScore);

            const actualScore = game.getState<number>("score");

            expect(actualScore).to.equal(expectedScore);
        });

        it('should throw an error when the state property is unrecognised', function () {
            const game = new Game();

            expect(() => game.getState<number>("score")).to.throw(
                "score is not present in game state"
            );
        });
    });
});
