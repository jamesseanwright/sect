import Component from './Component';

export type NextFunc<T extends Component> = (timestamp: number, component: T, ...otherComponents: T[]) => void;

export class System<T extends Component> {
    private _components: T[] = [];
    private _name: string;
    private _next: NextFunc<T>;
    private _otherComponents = new Map<T, T[]>();

    constructor(name: string, next: NextFunc<T>) {
        this._next = next;
    }

    protected get components(): T[] {
        return this._components;
    }

    public register(component: T) {
        this._components.push(component);
    }

    public deregister(component: T) {
        // mutating the array for performance
        this._components.splice(this._components.indexOf(component));
    }

    public update(timestamp: number): void {
        for (const component of this._components) {
            this._next(timestamp, component, ...this.getOtherComponents(component));
        }
    }

    /* memoised filtered component for perf although this
     * current implentation will cause linear ramps in memory
     * consumption and perf issues for many components */
    private getOtherComponents(component: T): T[] {
        if (!this._otherComponents.has(component)) {
            this._otherComponents.set(component, this.components.filter(c => c !== component));
        }

        return this._otherComponents.get(component);
    }
}

const createSystem = <T extends Component>(name: string, next: NextFunc<T>) => new System(name, next);

export default createSystem;
