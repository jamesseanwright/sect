const DEFAULT_KEYS = [
    'a',
    's',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft',
];

const toTuple = (a, b) => [a, b] as [typeof a, typeof b]; // TODO: reuse in other Map initialisers

class Keyboard {
    private static processKeyName(keyName: string): string {
        return keyName.match(/^[A-Z]{1}$/) ? keyName.toLowerCase() : keyName;
    }

    private keys: Map<string, boolean>;

    constructor(supportedKeys: string[] = DEFAULT_KEYS) {
        this.keys = new Map(supportedKeys.map(key => toTuple(key, false)));
        this.registerEvents();
    }

    public isPressed(keyName: string): boolean {
        const key = Keyboard.processKeyName(keyName);
        return this.keys.has(key) && this.keys.get(key);
    }

    private registerEvents(): void {
        window.addEventListener('keydown', ({ key }) => this.updateKey(key, true));
        window.addEventListener('keyup', ({ key }) => this.updateKey(key, false));
    }

    private updateKey(keyName: string, isKeyPressed: boolean): void {
        const key = Keyboard.processKeyName(keyName);

        if (!this.keys.has(key)) {
            return;
        }

        this.keys.set(key, isKeyPressed);
    }
}

export default Keyboard;
