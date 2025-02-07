import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { orgConfig } from './nillionOrgConfig.js';

// Use postSchema.js to create a new collection schema
// Update SCHEMA_ID to the schema id of your new collection
const SCHEMA_ID = '0656c3df-4119-4e2b-81d3-ef4060ddcb13';

const data = [
  {
    parties: [
      '0x1111117890123456789012345678901234567890',
      '0x2222227890123456789012345678901234567890',
      '0x3333337890123456789012345678901234567890',
    ],
  },
  {
    parties: [
      '0x4444447890123456789012345678901234567890',
      '0x5555557890123456789012345678901234567890',
      '0x6666667890123456789012345678901234567890',
    ],
  },
  {
    parties: [
      '0x7777777890123456789012345678901234567890',
      '0x8888888890123456789012345678901234567890',
      '0x9999999890123456789012345678901234567890',
    ],
  },
];

async function main() {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      SCHEMA_ID
    );
    await collection.init();

    // Write collection data to nodes encrypting the specified fields ahead of time
    const dataWritten = await collection.writeToNodes(data);
    console.log(
      '👀 Data written to nodes:',
      JSON.stringify(dataWritten, null, 2)
    );

    // Get the ids of the SecretVault records created
    const newIds = [
      ...new Set(dataWritten.map((item) => item.result.data.created).flat()),
    ];
    console.log('uploaded record ids:', newIds);

    // Read all collection data from the nodes, decrypting the specified fields
    const decryptedCollectionData = await collection.readFromNodes({});

    // Log first 5 records
    console.log(
      'Most recent records',
      decryptedCollectionData.slice(0, data.length)
    );
  } catch (error) {
    console.error('❌ SecretVaultWrapper error:', error.message);
    process.exit(1);
  }
}

main();
