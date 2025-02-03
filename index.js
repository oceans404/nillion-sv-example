import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { orgConfig } from './nillionOrgConfig.js';
import { v4 as uuidv4 } from 'uuid';

// Use postSchema.js to create a new collection schema
// Update SCHEMA_ID to the schema id of your new collection
const SCHEMA_ID = '840ba443-c667-4662-a118-fb0a51c546b9';

// shelter data
// $allot signals that the name years_in_web3 field will be encrypted
// Each node will have a different encrypted $share of encrypted field
const data = [
  {
    shelter_info: {
      name: { $allot: 'Happy Paws Warsaw Shelter' },
      location: { $allot: 'ul. Zwierzeca 12, 00-001 Warsaw' },
      operational_costs: { $allot: 180000 },
    },
    metrics: {
      current_animals: 45,
      monthly_intake: 12,
      neutering_count: 30,
      adoption_rate: 0.75,
    },
    animals: [
      {
        id: uuidv4(),
        species: 'cat',
        status: 'available',
        intake_date: '2024-02-03T12:00:00Z',
      },
      {
        id: uuidv4(),
        species: 'dog',
        status: 'adopted',
        intake_date: '2024-01-15T14:30:00Z',
      },
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
    console.log('✅ Collection initialized', collection);

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
