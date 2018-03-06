import { expect } from 'chai';
import * as sinon from 'sinon';
import * as createMockRaf from 'mock-raf';
import System from '../systems/System';
import Game from '../Game';
import { SinonStatic } from 'sinon';

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


    describe('start', function () {
        type FakeWindow = NodeJS.Global & Window;
        let mockRaf;

        beforeEach(function () {
            mockRaf = createMockRaf();
            (global as FakeWindow).requestAnimationFrame = mockRaf.raf;
        });

        afterEach(function () {
            (global as FakeWindow).requestAnimationFrame = undefined;
        });

        it('should update all of the systems in a rAF loop', function () {

        });
    });
});
