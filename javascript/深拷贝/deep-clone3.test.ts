import { deepClone } from './deep-clone3';

testPath('should be equal', () => {
  const target: any = {
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
  target.target = target;
  expect(deepClone(target)).toEqual(target);
});
