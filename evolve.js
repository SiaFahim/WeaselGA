window.onload = function(){
	var TARGET = prompt ("Say something!" , "METHINKS IT IS LIKE A WEASEL");
	var POP_SIZE = 1000; //population size.
	var POP_SIZE_GROWTH_RATIO = 1.001;
	var SURVIVAL_RATIO = 0.2;
	var MUT_PROB = 0.1;
	var GENE_MUT_PROB = 0.05;
	var SURVIVED_POP_SIZE = Math.floor((SURVIVAL_RATIO*POP_SIZE));
	var CHARACTERS = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 113, 119, 101, 114, 116, 121, 117,
					105, 111, 112, 91, 93, 92, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 122, 120, 99, 118, 98, 110,
					109, 44, 46, 47, 32, 126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 81, 87, 69, 82, 84, 89, 85, 73, 79,
					80, 123, 125, 124, 65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 34, 90, 88, 67, 86, 66, 78, 77, 60, 62, 63];
	var THE_ANSWER = [];
	var genNum = 0;
	var END_FACTOR = 300000;
	var fittestLoc = 0;
	var bestOfGeneration = [];

	run.addEventListener("click", function(){
		var TARGET = prompt ("Say something!" , "Hello World :)");
		// var TARGET = document.getElementById("userIn");
		evolve();
	});

	var getStrUniCode = function() {
		var uniCode = [];
		for (var i=0;  i<TARGET.length;++i){
			uniCode[i] = TARGET.charCodeAt(i);
		};
		return uniCode;
	};
	var targetCharCode = getStrUniCode();

	var genomeToAnswer = function(genome){
		var answer = [];
		for (var i=0; i<genome.length;++i){
			answer[i] = String.fromCharCode(genome[i]);
		}
		return answer.join('');
	};

	var generateRanGenome = function(){
		var genome =[];
		for (var i=0; i<targetCharCode.length;++i){
			genome[i] = CHARACTERS[Math.floor(Math.random()*CHARACTERS.length)];
		};
		return genome;
	};

	var getFitness = function(genome){
		var fitness = 0;
		for (var i=0; i<targetCharCode.length;++i){
			if (genome[i] === targetCharCode[i]){
				fitness++;
			}
		}
		return fitness;
	};

	var genRandomPop = function(){
		var pop =[];
		for (var i=0; i<POP_SIZE;++i){
			var genome = generateRanGenome();
			var fitness = getFitness(genome);
			parentObject = {
				Genome: genome,
				Fitness: fitness
			}
			pop.push(parentObject);
		}
		return pop;
	};
	var pop = genRandomPop();

	var brainWash = function(child){
		var fitness = 0;
		fitness = getFitness(child);
		childObject = {
			Genome: child,
			Fitness: fitness,
			leftChrom: splitGenome(child).leftChrom,
			rightChrom: splitGenome(child).rightChroms
		}
		return childObject;
	};

	var splitGenome = function(genome){
		var middle = Math.floor(genome.length/2);
		var splitedGenome = {
				leftChrom: genome.slice(0,middle),
				rightChrom: genome.slice(middle)
		};
		return splitedGenome;
	};

	var getBusy = function(){
		var lParent = pop[Math.floor(Math.random()*pop.length)].leftChrom;
		var rParent = pop[Math.floor(Math.random()*pop.length)].rightChrom;
		var offSpring = lParent.concat(rParent);
		return offSpring;
	};

	var mutateGenes = function(genome){
		// do the following between 0 and (some num < TARGET.length) times
		var howManyToMutate = TARGET.length*GENE_MUT_PROB;
		for (var i=0; i<howManyToMutate;++i){
			genome[Math.floor(Math.random()*genome.length)] = CHARACTERS[Math.floor(Math.random()*CHARACTERS.length)];
		}
	};

	var mutatePop = function(){
		var howManyToMutate = POP_SIZE*MUT_PROB
		for (var i=0; i<howManyToMutate;++i){
			var toMutate = pop[Math.floor(Math.random()*pop.length)].Genome
			mutateGenes(toMutate);
		}
	};

	var kill = function(){
		pop = pop.slice(0, SURVIVED_POP_SIZE);
		return pop;
	};

	var makeGeneration = function(){
		var newPop =[];
		var offSpring = [];
		pop.sort(function(a,b){return b.Fitness-a.Fitness});
		bestOfGeneration = genomeToAnswer(pop[fittestLoc].Genome);
		kill();
		mutatePop();
		for (var i=0; i<pop.length;++i){
			pop[i].leftChrom = splitGenome(pop[i].Genome).leftChrom;
			pop[i].rightChrom = splitGenome(pop[i].Genome).rightChrom;
		};
		for (var i=0; i<POP_SIZE;++i){
			// var j = i % pop.length;
			offSpring = getBusy()
			newPop.push(brainWash(offSpring));
		};
		pop = newPop;
		return bestOfGeneration;
	};

	var getTheFittest = function(fittest){
		for (var i=0; i<pop.length; ++i){
			if (fittest[i].Fitness === TARGET.length){
			THE_ANSWER = genomeToAnswer(fittest[i].Genome);
			fittestLoc = i;
			return fittestLoc;
			}
		}
		return THE_ANSWER;
	};

	var evolve = function(){
			getTheFittest(pop);
			while (pop[fittestLoc].Fitness < targetCharCode.length) {
				if (genNum > END_FACTOR) {
					break;
				}
				POP_SIZE = POP_SIZE*POP_SIZE_GROWTH_RATIO;
				makeGeneration();
				console.log (
					"Generation:",
					 genNum, "Best candidate:  ", genomeToAnswer(pop[fittestLoc].Genome),
					 "  Cost: ",
					 TARGET.length - pop[fittestLoc].Fitness,
					 " Population: ", pop.length
				 );
				document.getElementById("possibleAnswers").innerHTML = bestOfGeneration;
				document.getElementById("numOfGen").innerHTML = genNum;
				document.getElementById("cost").innerHTML = TARGET.length - pop[fittestLoc].Fitness;
				// document.getElementById("cost").innerHTML = TARGET.length - pop[fittestLoc].Fitness;
				getTheFittest(pop);
				++genNum;
			}
			console.log (bestOfGeneration);
			var cost = TARGET.length - pop[fittestLoc].Fitness;
			document.getElementById("possibleAnswers").innerHTML = THE_ANSWER;
			document.getElementById("cost").innerHTML = pop.length;
			document.getElementById("numOfGen").innerHTML = genNum;
	};
	evolve();
	// debugger
	console.log (THE_ANSWER);
};
