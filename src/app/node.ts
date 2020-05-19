import { NodeTypes } from './node-types.enum';
export class Node {
    nodeType: NodeTypes;
    xLocation: Number;
    yLocation: Number;
    constructor(xLocation, yLocation, nodeType: NodeTypes = NodeTypes.Default) {
        this.nodeType = nodeType;
        this.xLocation = xLocation;
        this.yLocation = yLocation;
    }
}
