const { Bigtable } = require('@google-cloud/bigtable');

// initialize bigtable instance
const bigtable = new Bigtable();
// Connect to an existing instance:my-bigtable-instance
const instance = bigtable.instance('georgecma-spacewalk');
// Connect to an existing table:my-table
const table = instance.table('package-record');

/**
 * Read all package locations for a given packageId.  
 * @returns {packageId: [locations]}
 */
// This is a wrapper for the readstream, we can just call the underlying.
async function getPackageLocation(packageId) {
  // Read a row from my-table using a row key
  try { // check to see if row exists 

    const [singleRow] = await table.row(packageId).get();
    // Print the row key and data (column value, labels, timestamp)
    const rowData = {
      [packageId]: {
        ...singleRow.data
      }
    };
    return rowData;
  } catch (e) {
    return { [packageId]: {} };
  }
}

// TODO:  use this as the baseline, we will edit it to include filters and prefixes
//        maybe we can use this to include package keys as well
async function getPackageLocationByPrefix(packagePrefix) {
  return new Promise(async (resolve, reject) => {
    const rowResult = {};
    await table
      .createReadStream({
        prefix: packagePrefix,
      })
      .on('error', err => {
        // Handle the error.
        console.log(err);
        return;
      })
      .on('data', row => {
        const id = row.id;
        const data = row.data;
        rowResult[id] = data;
      })
      .on('end', () => {
        resolve(rowResult)
      })
  })
}

/**
 * Update package location.
 * Row key: shipperId_dateId_packageId
 * Row column: {
 *  location:loc:timestamp
 * }
 */
async function updatePackageLocation(packageId, location) {
  const row = {
    key: packageId,
    data: {
      locations: location,


    }
  }
  await table.insert([row])
  return getPackageLocation(packageId);
}

module.exports = {
  getPackageLocation,
  updatePackageLocation,
  getPackageLocationByPrefix
}