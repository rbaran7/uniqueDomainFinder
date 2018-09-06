/*
Author: Roman Baran
Last Updated: 09/06/2018
*/

/*Use strict mode on this file. Strict mode prevents certain actions from being taken and throws more exceptions.*/
'use strict';

/*Invoke the Node.js File System and read the domain_logs file in syncly.*/
const fileSystem = require('fs'),
      logContent = fileSystem.readFileSync('domain_logs', 'utf8');

/*Function: takes in regex string for domain names.
  We create an array of just domain names and a count object.
  Then, we map through the array for each element and return the value of counts[element].
  We then display the unique domains and there counts.
*/
const domainNameFinder = (regexString) => {
    let domainArr = [],
        counts = {};

    domainArr = logContent.match(regexString);
    domainArr.map((element) => {
        counts[element] = (counts[element] || 0) + 1; /*Increment the value of the current unqiue domain.*/
    });

    /*Output the unique domain results*/
    console.log('\nName and Number of unique domains from the log file: \n')
    console.log(counts)

    /*Call Top Five Function */
    domainNameTopFive(counts)
}

/*Function: takes in count object of unique domains.
  We create an array(s) for the key values in counts.
  Then, we loop though pushing the key value pairs to arrays and the we sort them by highest to lowest Key values.
  We then display the results
*/
const domainNameTopFive = (counts) => {
    let topFiveArr = [];

	for(let key in counts)
        if(counts.hasOwnProperty(key)){
            topFiveArr.push([key, counts[key]]);
        }

    /* Sort items by value: Highest to Lowest*/
    topFiveArr.sort((x, y) => {
     return y[1] - x[1];
    });

    /*Output the Top 5: we can probably loop through these in the future*/
    console.log('\nTop 5 domains with most occurrences: \n') 
    for(let i = 0; i < 5; i++){
        console.log(topFiveArr[i] +'\n')   
    }
}

//Call the domainNameFinder Function passing in our regex value that grabs only the domain names from the file.
domainNameFinder(/(www.+.c)\w+/g)