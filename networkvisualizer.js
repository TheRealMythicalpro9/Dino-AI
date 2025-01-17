class NetworkVisualizer {
	constructor(brain, startX, startY, width, height) {
		this.brain = brain;
		this.startX = startX;
		this.startY = startY;
		this.width = width;
		this.height = height;
		this.inputLabels = [
			"Player Y",
			"Distance To Obstacle",
			"Obstacle Width",
			"Obstacle Height",
			"Bird Y",
			"Game Speed",
		];
		this.outputLabels = ["Big Jump", "Small Jump", "Duck"];
	}

	show(bestPlayer) {
		if (bestPlayer !== null) this.brain = bestPlayer.brain;
		this.drawTitle();
		this.calculateNodePositions();
		this.drawConnections();
		this.drawNodes();
	}

	drawTitle() {
		textSize(24);
		textAlign(CENTER, CENTER);
		textFont("sans-serif");
		textStyle(BOLD);
		fill(0);
		text("Best Of Previous Generation", this.startX + this.width / 2, this.startY);
	}

	calculateNodePositions() {
		this.nodePositions = [];
		for (let i = 0; i < this.brain.layers; i++) {
			let nodesInLayer = this.brain.nodes.filter(node => node.layer === i);
			let x = this.startX + ((i + 1.0) * this.width) / (this.brain.layers + 1.0);
			for (let j = 0; j < nodesInLayer.length; j++) {
				let y = this.startY + ((j + 1.0) * this.height) / (nodesInLayer.length + 1.0);
				let index = nodesInLayer[j].id;
				this.nodePositions[index] = createVector(x, y);
			}
		}
	}

	drawConnections() {
		this.brain.connections.forEach(connection => {
			let fromPos = this.nodePositions[connection.fromNode.id];
			let toPos = this.nodePositions[connection.toNode.id];
			let color = connection.weight > 0 ? [255, 0, 0] : [0, 0, 255];
			let opacity = connection.enabled ? 255 : 100;
			stroke(color[0], color[1], color[2], opacity);
			strokeWeight(map(abs(connection.weight), -1, 1, 1, 5));
			line(fromPos.x, fromPos.y, toPos.x, toPos.y);
		});
	}

	drawNodes() {
		const totalInputNodes = this.inputLabels.length;
		const totalOutputNodes = this.outputLabels.length;
		const biasNodeIndex = totalInputNodes + totalOutputNodes;

		this.nodePositions.forEach((pos, index) => {
			stroke(0);
			strokeWeight(1);
			fill(255);
			ellipse(pos.x, pos.y, 40, 40);
			fill(0);
			noStroke();
			textFont("sans-serif");
			textStyle(BOLD);
			textSize(18);
			textAlign(CENTER, CENTER);
			text(index, pos.x, pos.y);
			textSize(14);

			if (index < totalInputNodes) {
				textAlign(RIGHT, CENTER);
				text(this.inputLabels[index], pos.x - 40, pos.y);
			}

			if (index >= totalInputNodes && index < totalInputNodes + totalOutputNodes) {
				let outputIndex = index - totalInputNodes;
				textAlign(LEFT, CENTER);
				text(this.outputLabels[outputIndex], pos.x + 40, pos.y);
			}

			if (index === biasNodeIndex) {
				textAlign(RIGHT, CENTER);
				text("Bias", pos.x - 40, pos.y);
			}
		});
	}
}
