export class BinaryHeap {
    values;
    constructor() {
        this.values = [];
    }
    
    insert(val, priority) {
        this.values.push({val, priority});
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length-1;
        const element = this.values[idx];
        while(idx > 0) {
            let parentIdx = Math.floor((idx-1)/2);
            let parent = this.values[parentIdx];
            if(element.priority >=  this.values[parentIdx].priority) {
                break;
            }
            [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
            idx = parentIdx;
        }
    }

    extractMax() {
        const max = this.values[0].val;
        const end = this.values.pop();
        if(this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
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
                if(this.values[leftChildIdx].priority > element.priority) {
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length) {
                if((swap === null && this.values[rightChildIdx].priority > element.priority) ||
                    (swap !== null && this.values[rightChildIdx].priority > this.values[leftChildIdx].priority)) {
                    swap = rightChildIdx;
                }
            }
            if(swap === null) break;
            [this.values[swap], this.values[idx]] = [this.values[idx], this.values[swap]];
            idx = swap;
        }
    }
}
