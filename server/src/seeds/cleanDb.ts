import models from '../models/index.js';
import db from '../config/connection.js';

/* export default async (modelName: "Question", collectionName: string) => {
  try {
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
 */
export default async (modelName: keyof typeof models, collectionName: string): Promise<void> => {
  try {
    // Validate that the model exists
    if (!models[modelName]) {
      throw new Error(`Model "${modelName}" does not exist in models.`);
    }

    // Ensure the database connection is initialized
    if (!db || !db.db) {
      throw new Error("Database connection is not initialized.");
    }

    // Check if the collection exists
    const collections = await models[modelName].db.db.listCollections({ name: collectionName }).toArray();

    // Drop the collection if it exists
    if (collections.length) {
      await db.dropCollection(collectionName);
      console.log(`Collection "${collectionName}" dropped successfully.`);
    }
  } catch (err) {
    console.error(`Error in cleanDb: ${err.message}`);
    throw err; // Preserve the original error stack trace
  }
};