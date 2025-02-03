import { NilQLWrapper } from 'nillion-sv-wrappers';

/**
 * This is a standalone example of using NilQLWrapper to encrypt and decrypt data.
 * It is useful for testing and understanding the basic functionality of NilQLWrapper.
 */
async function main() {
  // Example data to encrypt
  const secretData = {
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
  };

  // The cluster config just needs an array of nodes for NilQLWrapper
  // - When using NilQLWrapper alone: nodes can be empty objects or contain any fields
  // - When using with SecretVaultWrapper: nodes must contain url and did fields
  const cluster = {
    nodes: [{}, {}, {}],
  };

  try {
    // Initialize wrapper with cluster config
    const encryptionWrapper = new NilQLWrapper(cluster);
    await encryptionWrapper.init();

    const allotted = await encryptionWrapper.prepareAndAllot(secretData);
    console.log('📚 Allot:', JSON.stringify(allotted, null, 2));

    const unified = await encryptionWrapper.unify(allotted);
    console.log('📚 Unify:', unified);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the example
main().catch(console.error);
