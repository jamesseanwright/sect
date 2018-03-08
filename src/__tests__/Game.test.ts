import { expect } from 'chai';
import * as createMockRaf from 'mock-raf';
import * as sinon from 'sinon';
import { Component } from '../components';
import Game from '../Game';
import System from '../systems/System';

describe('Game', function () {
    describe('game state', function () {
        it('should allow access to a state property by key', function () {
            const game = new Game();
            const expectedScore = 100;

            game.setState<number>('score', expectedScore);

            const actualScore = game.getState<number>('score');

            expect(actualScore).to.equal(expectedScore);
        });

        it('should throw an error when the state property is unrecognised', function () {
            const game = new Game();

            expect(() => game.getState<number>('score')).to.throw(
                'score is not present in game state',
            );
        });
    });

    describe('start', function () {
        type FakeWindow = NodeJS.Global & Window;

        class StubSystem extends System<Component> {
            public next(component: Component, timestamp: number) {}
        }

        const system = new StubSystem();
        const mockSystem = sinon.mock(system);
        let game: Game;
        let mockRaf;

        beforeEach(function () {
            game = new Game(system);
            mockRaf = createMockRaf();
            (global as FakeWindow).requestAnimationFrame = mockRaf.raf;
        });

        afterEach(function () {
            (global as FakeWindow).requestAnimationFrame = undefined;
            mockSystem.restore();
        });

        it('should update all of the systems in a rAF loop', function () {
            mockSystem.expects('update')
                .twice()
                .withArgs(sinon.match.number);

            game.start();
            mockRaf.step();
            mockRaf.step();

            mockSystem.verify();
        });
    });
});
