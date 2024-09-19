class Population {
	constructor(populationSize) {
		this.populationSize = populationSize;
		this.population = [];
		this.generation = 1;
		this.bestPlayer = null;
		this.bestFitness = 0;
		this.species = [];
		this.innovationHistory = [];
		this.initializePopulation();
	}

	initializePopulation() {
		for (let i = 0; i < this.populationSize; i++) {
			const player = new Player();
			player.brain.mutate(this.innovationHistory);
			player.brain.generateNetwork();
			this.population.push(player);
		}
	}

	updatePlayers() {
		for (let player of this.population) {
			if (player.isAlive) {
				player.look();
				player.think();
				player.update();
			}
		}
	}

	showPlayers() {
		for (let player of this.population) {
			if (player.isAlive) {
				player.show();
			}
		}
	}

	allDead() {
		return this.population.every(player => !player.isAlive);
	}

	setBestPlayer() {
		let maxFitness = 0;
		for (let player of this.population) {
			if (player.fitness > maxFitness) {
				this.bestPlayer = player.clone();
				this.bestFitness = player.fitness;
			}
		}
	}

	getAverageFitnessSum() {
		return this.species.reduce((sum, s) => sum + s.averageFitness, 0);
	}

	naturalSelection() {
		this.speciate();
		this.calculateFitness();
		this.sortSpecies();
		this.killWeakest();
		this.setBestPlayer();
		this.killStaleSpecies();
		this.killExtinctSpecies();
		this.nextGeneration();
	}

	speciate() {
		for (let species of this.species) {
			species.players = [];
		}

		for (let player of this.population) {
			let added = false;
			for (let species of this.species) {
				if (species.isSameSpecies(player.brain)) {
					species.addToSpecies(player);
					added = true;
					break;
				}
			}
			if (!added) {
				this.species.push(new Species(player));
			}
		}
	}

	calculateFitness() {
		for (let player of this.population) {
			player.calculateFitness();
		}
	}

	sortSpecies() {
		for (let species of this.species) {
			species.sortSpecies();
		}

		this.species.sort((a, b) => b.bestFitness - a.bestFitness);
	}

	killWeakest() {
		for (let species of this.species) {
			species.killWeakest();
			species.fitnessSharing();
			species.setAverageFitness();
		}
	}

	killStaleSpecies() {
		for (let i = this.species.length - 1; i >= 2; i--) {
			if (this.species[i].staleness >= 15) {
				this.species.splice(i, 1);
			}
		}
	}

	killExtinctSpecies() {
		let averageSum = this.getAverageFitnessSum();
		for (let i = this.species.length - 1; i >= 1; i--) {
			if ((this.species[i].averageFitness / averageSum) * this.population.length < 1) {
				this.species.splice(i, 1);
			}
		}
	}

	nextGeneration() {
		let averageSum = this.getAverageFitnessSum();
		let children = [];

		for (let species of this.species) {
			children.push(species.champion.clone());
			let childrenPerSpecies = floor((species.averageFitness / averageSum) * this.population.length) - 1;

			for (let j = 0; j < childrenPerSpecies; j++) {
				children.push(species.reproduce(this.innovationHistory));
			}
		}

		while (children.length < this.population.length) {
			children.push(this.species[0].reproduce(this.innovationHistory));
		}

		this.population = children;
		this.generation++;

		for (let player of this.population) {
			player.brain.generateNetwork();
		}
	}
}
