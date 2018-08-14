import Component from './Component';
import { System } from './createSystem';
import SystemRegistry from './SystemRegistry';

const noOp = () => undefined;

class Game {
    private systems: System<Component>[];
    private gameState = new Map<string, any>();
    private loopStartCallback = noOp;
    private loopEndCallback = noOp;

    constructor(systemRegistry: SystemRegistry) {
        this.systems = Array.from(systemRegistry.values());
    }

    public start(): void {
        requestAnimationFrame(this.loop);
    }

    public onLoopStart(callback: () => void) {
        this.loopStartCallback = callback;
    }

    public onLoopEnd(callback: () => void) {
        this.loopEndCallback = callback;
    }

    public getState<T>(key: string): T {
        return this.gameState.get(key) as T;
    }

    public setState<T>(key: string, computeValue: (currentValue: T) => T) {
        const currentValue = this.getState<T>(key);
        this.gameState.set(key, computeValue(currentValue));
    }

    private loop = (timestamp: number): void => {
        this.loopStartCallback();

        for (const system of this.systems) {
            system.update(timestamp);
        }

        this.loopEndCallback();

        // requestAnimationFrame(this.loop);
    }
}

export default Game;
