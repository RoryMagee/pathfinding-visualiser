import { NodeTypes } from './node-types.enum';
export interface Node {
    y: number,
    x: number,
    nodeType?: NodeTypes
}
