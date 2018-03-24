import EntityGroup from './EntityGroup';
import Entity from '../Entity';

type groupTuple = [string, Entity[]];

export default class EntityPool {
    private static createGroups = (entityGroups: groupTuple[]) => entityGroups.map(
        ([name, entities]) => [name, new EntityGroup(entities)] as [string, EntityGroup],
    )

    private entityGroups;

    constructor(entityGroups: groupTuple[]) {
        this.entityGroups = new Map<string, EntityGroup>(EntityPool.createGroups(entityGroups));
    }
}
