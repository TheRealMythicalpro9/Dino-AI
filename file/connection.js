class Connection {
    constructor(fromNode, toNode, weight, innovationNumber) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.weight = weight;
        this.enabled = true;
        this.innovationNumber = innovationNumber;
    }

    mutateWeight() {
        if (random(1) < 0.1) {
            this.weight = random(-1, 1);
        } else {
            this.weight += randomGaussian() / 50;
            this.weight = constrain(this.weight, -1, 1);
        }
    }

    clone(fromNode, toNode) {
        let clone = new Connection(fromNode, toNode, this.weight, this.innovationNumber);
        clone.enabled = this.enabled;
        return clone;
    }
}
