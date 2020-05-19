import { Node } from './node';
import { NodeTypes } from './node-types.enum';

describe('Node', () => {
  it('should create an instance', () => {
    expect(new Node(0,0)).toBeTruthy();
  });
});
