# Nillion Secret Vault Example

This example demonstrates using the [nillion-sv-wrappers package](https://github.com/oceans404/nillion-sv-wrappers) to read and write data to a Nillion Secret Vault Collection.

## Setup

Clone this repo and install dependencies

```
npm i
```

Run the example

```
node index.js
```

## Project Structure

### index.js: Main example file showing how to:

- Set collectionConfig (schema id and encrypted fields)
- Initialize SecretVaultWrapper
- Write data with encrypted fields
- Read and decrypt data from nodes

### nillionOrgConfig.js: Configuration file containing:

- Organization credentials (secret key, org did)
  - Note: In a production environment, make sure to move credentials to environment variables. I left these in so that you can run my exact example
- Node URLs and DIDs or all nodes in your org

### schema.json: JSON Schema for the Web3 survey collection

- Note this json file isn't used directly; it's included to show the schema
- The reference to this schema by id is in the collectionConfig in the index.js file
- The years_in_web3 field type is a string rather than a number so that the schema expects this field to be encrypted shares (string)
