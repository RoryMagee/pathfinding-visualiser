import { BinaryHeap } from './binary-heap';

let bh;
describe('BinaryHeap', () => {
    beforeEach(() => { bh = new BinaryHeap(); });

    it('should create an instance', () => {
        expect(bh).toBeTruthy();
    });


    it('object should be pushed to list', () => {
        bh.insert(5,5);
        expect(bh.values[0]).toEqual({val: 5, priority: 5});
    });

    it('pushing multiple objects to priority queue', () => {
        bh.insert(5,5);
        bh.insert(4,4);
        expect(bh.values.length).toBe(2);
    });

    it('should return the item with the lowest priority', () => {
        bh.insert(5,5);
        bh.insert(4,4);
        expect(bh.extractMax()).toBe(4);
    });
});


