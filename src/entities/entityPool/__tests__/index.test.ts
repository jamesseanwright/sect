import { expect } from 'chai';
import { Component } from '../../../components';
import EntityPool from '../';
import Entity from '../../Entity';

describe('EntityPool', function () {
    class StubComponent extends Component {}

    describe('getGroup', function () {
        // not stubbing EntityGroup, but it'll be fine
        it('should get the entity group for the matching key', function () {
            const entities = [new Entity(new StubComponent())];

            const entityPool = new EntityPool([
                ['stubGroup', entities],
            ]);

            const group = entityPool.getGroup('stubGroup');
            const actualEntity = group.getNextEntity();
            const [expectedEntity] = entities;

            expect(actualEntity).to.equal(expectedEntity);
        });
    });
});
