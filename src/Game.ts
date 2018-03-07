import System from './systems/System';

class Game {
    private systems: System[];
    private gameState = new Map<string, any>();

    constructor(...systems: System[]) {
        this.systems = systems;
    }

    public start(): void {
        requestAnimationFrame(this.loop);
    }

    public getState<T>(key: string): T {
        if (!this.gameState.has(key)) {
            throw new Error(`${key} is not present in game state`);
        }

        return this.gameState.get(key) as T;
    }

    public setState<T>(key: string, value: T) {
        this.gameState.set(key, value);
    }

    private loop = (timestamp: number): void => {
        for (const system of this.systems) {
            system.update(timestamp);
        }

        requestAnimationFrame(this.loop);
    }
}

export default Game;
