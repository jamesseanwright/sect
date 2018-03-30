import EntityGroup from './EntityGroup';
import { Entity } from '@tecs/core';

export type groupTuple = [string, Entity[]];

export default class EntityPool {
    private static createGroups = (entityGroups: groupTuple[]) => entityGroups.map(
        ([name, entities]) => [name, new EntityGroup(entities)] as [string, EntityGroup],
    )

    private entityGroups: Map<string, EntityGroup>;

    constructor(entityGroups: groupTuple[]) {
        this.entityGroups = new Map<string, EntityGroup>(EntityPool.createGroups(entityGroups));
    }

    public getGroup(groupName: string): EntityGroup { // TODO: error handling
        return this.entityGroups.get(groupName);
    }
}
