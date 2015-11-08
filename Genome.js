//this algorythm does not have the Mating (crossover) in it, it will work more efficiently by adding crossover function.
 
var TARGET = "METHINKS IT IS LIKE A WEASEL";
             // "BE THE CHANGE YOU WISH TO SEE IN THE WORLD!"
var ALPHABET = "ABCDEFGHIJKLMONPQRSTUVWXYZ ";
var MUT_PROB =1;
var pool = [];
var genNum = 0;

var generateGenome = function(){
    var genome = [];
    for (var i =0; i<28;++i){
        genome[i]=ALPHABET[Math.floor(Math.random()*ALPHABET.length)];
    }
    return genome.join("");
};

var getFitness = function(genome){
    var fitness=0;
    for (var i=0; i<TARGET.length;++i){
        if (genome[i]===TARGET[i]){
            fitness++;
        }
    }
    return fitness;
}; 


var getRandomGenePool = function(){
    var pool = [];
    for (var i=0; i<50;++i){
        pool[i] = generateGenome()
        console.log(pool);
    }
    return pool;
};

var getFittest = function(pool){
    var fittestLoc = 0;
    var fittest = 0;
    for (var i=0; i<pool.length;++i){
        if (getFitness(pool[i]) >fittest){
            fittest = getFitness(pool[i]);
            fittestLoc = i;
        }
    }
    return pool[fittestLoc];
};

var doMutation = function(genome){
    var newGenome = "";
    for (var i = 0; i < genome.length; ++i){
        if (Math.random()*100 <= MUT_PROB){
            if (genome[i] != TARGET[i]){
                newGenome += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            }
            else{
                newGenome += genome[i];
            }
        }
        else{
            newGenome += genome[i];
        }
    }
    return newGenome;
};

var runEveryGeneration = function() {
    console.log("generation: " + genNum);
    genNum++;
    var pool2 = [];
    for (var i=0; i < pool.length; ++i){
        pool2[i] = doMutation(pool[i], true)
    }
    return pool2;
}


var evolve = function(){
    var fittest = pool[0];
    while (getFitness(fittest) !== 28){
        pool = runEveryGeneration();
        fittest = getFittest(pool);
        console.log(fittest);
    }

    return fittest;
};

pool = getRandomGenePool();

console.log (evolve());



