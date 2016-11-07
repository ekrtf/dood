# Research Methodology and Design

The purpose of this research is to conduct an eperiment. The eperiment consists in comparing key analytics collected on two versions of the same website. On version being driven by existing solutions - Yelp and TripAdvisor. The other driven by Machine Learning techniques provided by IBM Watson's API.

========================================
Challenges to overcome:
	1. find a source of data to search through

========================================

## Research Objectives
>I want to prove that there is a better way of looking for a travel destination than what the tourism industry currently offers. Today people search by destination, by price or by dates. I want to prove that better results can emerge from desire, feeling, atmostphere wanted and envy. Granted, these are not easily quantifiable

* Prove that Machine Learning can drastically imporve HCI
* Prove that better HCI drives higher sales


## Research Strategy
>Compare the results obtained by existing solutions (i.e. travel guides) and the model found

Objective: prove that an AI driven website offers better User Experience and in consequence drives sales

Experiment: A/B style

- make 2 versions of the same website:
    - 1 to Yelp/TripAdvisor API
    - 1 to Watson
- plug Google Analytics to both
- send people to the site
- compare analytics

Core of the research: the layer between the user input and Watson results.

### Website 1: static

The search section of this website will be very similar to existing websites.
The form will include inputs like:
* destination
* start and end date
* number of people

The user input from the UI will be used to query the TripAdvisor API and results will be returned without any additional filtering or sorting.

### Website 2: ML driven

The search section of this website will differ. The form will be only one input asking "What would you like?".

==> **The research consists in (1) finding a way of converting a user's answer to the question "What would you like?" into search queries to travel sites and (2) filtering the results into innovative outputs for the user**

## Research Procedure
> How to convert high level user input into search query parameters
> OPHERIC that bitch

### Challenge 1: finding the source of data
**Observation:** To conduct the proposed experiment, a large dataset of travel options is needed. That dataset will be the core material of this research.

**Problematic:** Where can we find a *good* (real, unbiased, large enough) dataset to work with?

**Hypothesis:** Travel companies may be willing to share their catalog.

**Experience:** The initial incentive was to reach out to travel companies and ask them to share their catalog. 

**Results:** This idea immediatly introduced confidentiality concerns. For digitized travel companies their catalog is at the core of the business. Sales and prospection teams work full time on getting new listings while engineering and marketing are dedicated to delivering and creating value with that data.

**Interpretation:** Too much legal contraints. For personal reasons, I do not wish my dissertation bound to legal agreements.

**Conclusion:** Let's look for public data in order to avoid any legal obstacles. Luckily, travel companies do make some of their data public through an API. That's the Open Data philosophy.

