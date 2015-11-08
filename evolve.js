var TARGET = prompt ("Say something!" , "Hello, World :)");
var CHARACTERS = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 32, 126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 123, 125, 124, 65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 34, 90, 88, 67, 86, 66, 78, 77, 60, 62, 63];
var POP_SIZE = 100; //population size.
var SURVIVAL_RATIO = 30;
var MUT_RATIO = 5;
var MUT_STRENGTH = 1;
var SURVIVED_POP_SIZE = Math.floor((SURVIVAL_RATIO / POP_SIZE) * 100);


var getStrUniCode = function() {
	var uniCode = [];
	for (var i=0;  i<TARGET.length;++i){
		uniCode[i] = TARGET.charCodeAt(i);
	};
	return uniCode;
};
var targetCharCode = getStrUniCode();

var generateGenome = function(){
	var genome =[];
	for (var i=0; i<TARGET.length;++i){
		genome[i] = CHARACTERS[Math.floor(Math.random()*CHARACTERS.length)];
	};
	return genome;
};

var genRandomPop = function(){
	var localPop = [];
	for (var i=0; i<POP_SIZE;++i){
		localPop[i] = generateGenome();
	};
	return localPop;
};
var pop = genRandomPop();

var getFitness = function(genome){
    var fitness=0;
    for (var i=0; i<TARGET.length;++i){
        if (genome[i]===targetCharCode[i]){
            fitness++;
        }
    }
    return fitness;
}; 

var scorePop = function(){
	var scoredPop = [];
	for (var i=0; i<POP_SIZE;++i){
		scoredPop[i] = {
			genome: pop[i],
			fitness: getFitness(pop[i])
		}
	}
	return scoredPop;
};
var scoredPop = scorePop();

var sortPop = function(){
	var sortedPop = scoredPop.sort(function(a,b)
	{return b.fitness - a.fitness});
	return sortedPop;
};
var sortedPop = sortPop();

var kill = function(sortedPop){
	var survivedPop = sortedPop.slice(0,SURVIVED_POP_SIZE);
	return survivedPop;
};
var survivedPop = kill(sortedPop);

// var doMutateGene = function()

// var doMutateGenome = function()

var splitGenome = function(survivor){
	var genome = survivor.genome;
	var middle = Math.floor(genome.length/2);
	survivor.leftChrom = genome.slice(0,middle);
	survivor.rightChrom = genome.slice((middle), (genome.length));	
	return survivor;
};

for (var i=0; i<survivedPop.length;++i){
	splitGenome(survivedPop[i]);
};

console.log(survivedPop);




















