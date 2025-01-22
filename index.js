import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from './nillionOrgConfig.js';

// Web3 Experience Survey Collection Config
// Check out the full schema in schema.json
const collectionConfig = {
  schemaId: '53f9e1de-e0a3-46ab-86c6-3fd380ad8877',
  encryptedFields: ['years_in_web3'],
};

// Web3 Experience Survey Data to add to the collection
// Note that the years_in_web3 field will be encrypted ahead of time
// Each node will have a different encrypted share of the years_in_web3 field
const data = [
  {
    _id: uuidv4(),
    years_in_web3: 5,
    responses: [
      { rating: 5, question_number: 1 },
      { rating: 3, question_number: 2 },
    ],
  },
  {
    _id: uuidv4(),
    years_in_web3: 1,
    responses: [
      { rating: 2, question_number: 1 },
      { rating: 4, question_number: 2 },
    ],
  },
];

async function main() {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      collectionConfig.schemaId
    );
    await collection.init();

    // Write collection data to nodes encrypting the specified fields ahead of time
    const dataWritten = await collection.writeToNodes(
      data,
      collectionConfig.encryptedFields
    );

    // Get the ids of the SecretVault records created
    const newIds = [
      ...new Set(dataWritten.map((item) => item.result.data.created).flat()),
    ];
    console.log('uploaded record ids:', newIds);

    // Read all collection data from the nodes, decrypting the specified fields
    const decryptedCollectionData = await collection.readFromNodes(
      {},
      collectionConfig.encryptedFields
    );

    // Log first 5 records
    console.log('Most recent records', decryptedCollectionData.slice(0, 5));
  } catch (error) {
    console.error('❌ SecretVaultWrapper error:', error.message);
    process.exit(1);
  }
}

main();
