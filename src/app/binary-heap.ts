export class BinaryHeap {
    values;
    constructor() {
        this.values = [];
    }
    insert(val) {
        this.values.push(val);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length-1;
        const element = this.values[idx];
        while(idx > 0) {
            let parentIdx = Math.floor((idx-1)/2);
            if(element > this.values[parentIdx]) {
                [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
                idx = parentIdx;
            }
        }
    }
    
    extractMax() {
        const max = this.values[0];
        const end = this.values.pop();
        this.values[0] = end;
        this.sinkDown();
        return max;
    }

    sinkDown() {
        let idx = 0;
        const lenght = this.values.length;
        const element = this.values[0];
        while(true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let swap = null;
            if(leftChildIdx < length) {
                if(this.values[leftChildIdx] > element) {
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length) {
                if((swap === null && this.values[rightChildIdx] > element) ||
                    (swap !== null && this.values[rightChildIdx] > this.values[leftChildIdx])) {
                    swap = rightChildIdx;
                }
            }
            if(swap === null) break;
            [this.values[swap], this.values[idx]] = [this.values[idx], this.values[swap]];
            idx = swap;
        }
    }
}
