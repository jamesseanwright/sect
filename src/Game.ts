import System from './systems/System';

class Game {
    private systems: System[];
    private gameState = new Map<string, any>();

    constructor(...systems: System[]) {
        this.systems = systems;
    }

    private loop = (timestamp: number): void => {
        for (let system of this.systems) {
            system.update(timestamp);
        }

        requestAnimationFrame(this.loop);
    }

    start(): void {
        requestAnimationFrame(this.loop);
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
