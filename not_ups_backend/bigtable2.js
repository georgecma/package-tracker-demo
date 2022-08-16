const { Bigtable } = require('@google-cloud/bigtable');

class BigTableReader {
    constructor(instanceName, tableName) {
        const bigtable = new Bigtable()
        this.instance = bigtable.instance(instanceName)
        this.table = this.instance.table(tableName)
    }
}
