import { expect } from 'chai';
import * as sinon from 'sinon';
import { createDom, RafManipulator } from '@tecs/test-utils';
import Component from '../Component';
import Game from '../Game';
import System from '../System';
import SystemRegistry from '../SystemRegistry';

describe('Game', function () {
    describe('game state', function () {
        it('should allow access to a state property by key', function () {
            const game = new Game(new SystemRegistry());
            const expectedScore = 100;

            game.setState<number>('score', expectedScore);

            const actualScore = game.getState<number>('score');

            expect(actualScore).to.equal(expectedScore);
        });

        it('should throw an error when the state property is unrecognised', function () {
            const game = new Game(new SystemRegistry());

            expect(() => game.getState<number>('score')).to.throw(
                'score is not present in game state',
            );
        });
    });

    describe('start', function () {
        let destroyDom: () => void;
        let raf: RafManipulator;

        class StubSystem extends System<Component> {
            public next(component: Component, timestamp: number) {}
        }

        const system = new StubSystem();
        const mockSystem = sinon.mock(system);
        const systemRegistry = new SystemRegistry([[Component, system]]);
        let game: Game;

        beforeEach(function ()  {
            const { destroy, rafManipulator } = createDom();

            game = new Game(systemRegistry);
            destroyDom = destroy;
            raf = rafManipulator;
        });

        afterEach(function () {
            destroyDom();
            mockSystem.restore();
        });

        it('should update all of the systems in a rAF loop', function () {
            mockSystem.expects('update')
                .twice()
                .withArgs(sinon.match.number);

            game.start();
            raf.step();
            raf.step();

            mockSystem.verify();
        });
    });
});
