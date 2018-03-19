import { Component } from './components/Component';
import System from './systems/System';
import { SystemRegistry } from './systems/systemRegistry';

class Game {
    private systems: System<Component>[];
    private gameState = new Map<string, any>();

    constructor(systemRegistry: SystemRegistry) {
        this.systems = Array.from(systemRegistry.values());
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
