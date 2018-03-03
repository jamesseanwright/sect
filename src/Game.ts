import System from './systems/System';

class Game {
    private systems: System[];
    private gameState = new Map<string, any>();

    constructor(...systems: System[]) {
        this.systems = systems;
    }

    start() {
        // TODO: make private instance method
        const loop = (timestamp: number) => {
            for (let system of this.systems) {
                system.update(timestamp);
            }

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }

    getState<T>(key: string): T {
        if (!this.gameState.has(key)) {
            throw new Error(`${key} is not present in game state`);
        }

        return this.gameState.get(key) as T;
    }

    setState<T>(key: string, value: T) {
        this.gameState.set(key, value);
    }
}

export default Game;
