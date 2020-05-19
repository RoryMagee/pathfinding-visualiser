import { WeightedGraph } from './weighted-graph';

let wg;

describe('WeightedGraph', () => {
    beforeEach(() => {
        wg = new WeightedGraph();
    });

    it('should create an instance', () => {
        expect(wg).toBeTruthy();
    });
    
    it('should add a vertex', () => {
        wg.addVertex("testNode"); 
        expect(wg.adjacencyList["testNode"]).toBeTruthy();
    });

});
