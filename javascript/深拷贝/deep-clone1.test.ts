import { deepClone } from './deep-clone1';

test('should be equal', () => {
  const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: {
      child: 'child',
      child2: {
        child2: 'child2',
      },
    },
  };
  const target2 = {
    field1: 1,
    field2: undefined,
    field3: ['a', 'b', 'c'],
    field4: {
      child: 'child',
      child2: {
        child2: 'child2',
      },
    },
  };
  expect(deepClone(target)).toEqual(target);
  expect(deepClone(target2)).toEqual(target2);
});
