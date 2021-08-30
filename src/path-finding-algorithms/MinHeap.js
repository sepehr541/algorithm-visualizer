export default class MinHeap {
    constructor(comparator) {
        // make it 1-based indexed
        this.heap = [null];
        this.comparator = comparator;
    }

    insert(value) {
        this.heap.push(value);
        this.heapify();
    }

    delete(i) {
        let n = this.heap.length;
        if (i > 0 && n > 1) {
            const elm = this.heap[i];
            this.heap[i] = this.heap[n - 1];
            this.heap.pop();
            this.heapify();
            return elm;
        }
        return null;
    }

    peek() {
        return this.heap[1];
    }

    pop() {
        return this.delete(1);
    }

    heapify() {
        const n = this.heap.length;
        let i = Math.floor((n - 1) / 2);
        while (i >= 1) {
            const l = (i * 2);
            const r = l + 1;
            let min = i;
            if (this.comparator(this.heap[l], this.heap[min])) min = l;
            if (this.comparator(this.heap[r], this.heap[min])) min = r;
    
            // swap
            const temp = this.heap[min];
            this.heap[min] = this.heap[i];
            this.heap[i] = temp;
    
            i--;
        }
    };

    print() {
        console.log(this.heap.slice(1, 4));
    }

    length() {
        return this.heap.length - 1;
    }
};
