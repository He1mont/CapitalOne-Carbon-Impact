## Predicting the carbon impart value
### Data

What
- Transaction data with it's features
	- transaction amount
	- product type
	- mode of transportation
- Carbon emission value corresponding to each transaction

Where
- Open Data in existing databases
	- Some organizations maintain carbon emission databases for products and services
	- Publicly available data, such as government environmental reports.
- Literature research
	- Investigate literature or environmental research to find methods and data.

### Model

Regression problem
- build a model that predicts carbon emission values based on input transaction features.
- find some pre-trained model

### Problems

- What can we get from transaction in Captial One?
	- transaction features
- Where can we collect the carbon impact data?
	- need to have detailed transaction features
	- cannot be too early
- Feature transformation
	- Feature engineering and data processing
	- Convert the collected data features into the feature format in Captial One
	- The categories of features may differ
		- product type: groceries, eat out, transfer accounts etc.
- Carbon emission data has timeliness
	- how will it change over time?
	- Regularly monitor model performance and update the model when new data becomes available to reflect changes in carbon impart data

## Scoring the carbon impart

Make it easier for users to understand the environmental impact of their transactions.

### Features

- Carbon emissions values
- Product type
	- Compare the carbon emissions in specific product categories

### Rules

Assign an eco-friendliness score to each transaction

1. Score based on Carbon Emission Value Size
	- The most straightforward method
	- For example, define a range, and map carbon emission values to these ranges, assigning corresponding scores.
    
2. Score based on Environmental Standards
	- Transactions that meet specific environmental standards (guidelines provided by certification bodies) can receive higher scores.
    
3. Composite Score
	- Consider multiple factors, such as carbon emission values, product type, mode of transportation, production location, etc, to develop a composite scoring system. 
	- Weighing the importance of different factors.
