import { expect } from 'chai';
import { Entity } from '@tecs/core';
import EntityGroup from '../EntityGroup';

describe('EntityGroup', function () {
    let entities: Entity[];
    let entityGroup: EntityGroup;

    beforeEach(function () {
        entities = [
            new Entity(),
            new Entity(),
            new Entity(),
        ];

        entityGroup = new EntityGroup(entities);
    });

    describe('getNextEntity', function () {
        it('should return the least recently-requested entity', function () {
            entities.forEach(entity => {
                expect(entityGroup.getNextEntity()).to.equal(entity);
            });

            // demonstrate that it will loop back to the first entity
            const firstEntity = entityGroup.getNextEntity();
            expect(firstEntity).to.equal(entities[0]);
        });
    });

    describe('resetEntity', function () {
        it('should set an entity`s isActive property to false', function () {
            const entity = new Entity();
            entity.isActive = true;

            entityGroup.resetEntity(entity);

            expect(entity.isActive).to.be.false;
        });
    });

    describe('resetAllEntities', function () {
        it('should reset all entities associated with the group', function () {
            entities.forEach(entity => entity.isActive = true);
            entityGroup.resetAllEntities();

            entities.forEach(entity => expect(entity.isActive).to.be.false);
        });
    });
});
