# Research Methodology and Design

## Research Objectives
>I want to prove that there is a better way of looking for a travel destination than what the tourism industry currently offers. Today people search by destination, by price or by dates. I want to prove that better results can emerge from desire, feeling, atmostphere wanted and envy. Granted, these are not easily quantifiable


* Find a way to categorise travel options given a set of critierias
* Confirm that computers can handle more parameters than humans
* Confirm that using machine learning to find a tour opens a lot more possible choices and narrows it down to a few choices that fit best
* Overall confirm that Machine Learning in Tourism could drastically improve customer experience

## Research Strategy
Compare the results obtained by existing solutions (i.e. travel guides) and the model found

The scenario: a couple is looking for a holiday destination next August. They have preferences and budget restrictions.

Step 1: Get a large sample of possible options from travel websites
Step 2: Ask a large group of people to label these options ‘Yes’ or ‘No’ through an interactive website
Step 3: Find the correlation between an option’s criterias and people’s answer
Step 4: Use an off-the-shelf library like scikit-learn or TensorFlow to train a function with the labeled dataset
Step 5: Test if the function can now go through an unknown set of travel options and label the options ‘Yes’ or ‘No’
Step 6: Give the same unknown dataset to professional travel guides and see if their classification is similar