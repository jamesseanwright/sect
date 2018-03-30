import { Entity } from '@tecs/core';

export default class EntityGroup {
    private static getNextPosition = (position: number, entityCount: number) => (
        position === entityCount - 1 ? 0 : position + 1
    )

    private position: number = 0;
    private entities: Entity[];

    constructor(entities: Entity[]) {
        this.entities = entities;
    }

    public getNextEntity(): Entity {
        const entity = this.entities[this.position];

        this.position = EntityGroup.getNextPosition(
            this.position,
            this.entities.length,
        );

        return entity;
    }

    public resetEntity(entity: Entity): void {
        entity.isActive = false;
    }

    public resetAllEntities(): void {
        for (const entity of this.entities) {
            this.resetEntity(entity);
        }
    }
}
