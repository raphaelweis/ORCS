export default class DoublyCircularLinkedList {
    tail;

    constructor() {
        this.head = null;
    }

    #addToEmpty(data) {
        data.next = data;
        data.prev = data;
        this.head = data;
    }

    addToBeginning(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.#addToEmpty(newNode);
            return;
        }
        let tail = this.head.prev;
        newNode.next = this.head;
        newNode.prev = tail;
        tail.next = newNode;
        this.head.prev = newNode;
        this.head = newNode;
    }

    addToEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.#addToEmpty(newNode);
            return;
        }
        let tail = this.head.prev;
        newNode.next = this.head;
        newNode.prev = tail;
        tail.next = newNode;
        this.head.prev = newNode;
    }


    shiftLeft() {
        this.tail = this.tail.next;
    }

    shiftRight() {
        this.tail = this.tail.next;
    }
}

class Node {
    data;
    prev;
    next;

    constructor(data) {
        this.data = data
        this.prev = null;
        this.next = null;
    }
}

let list = new DoublyCircularLinkedList();
// list.addToBeginning(1);
// list.addToBeginning(2);
// list.addToBeginning(3);
list.addToEnd(1);
list.addToEnd(2);
list.addToEnd(3);
// list.shiftRight();
let current = list.head;
do {
    console.log(current.data);
    current = current.next;
} while (current !== list.head);
console.log("---");
current = list.head;
do {
    console.log(current.prev.data);
    current = current.next;
} while (current !== list.head);
console.log("---");
current = list.head;
do {
    console.log(current.next.data);
    current = current.next;
} while (current !== list.head);