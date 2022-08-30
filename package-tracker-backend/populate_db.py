
'''
Script to populate localhost:8080 server with test data.

Row format:
#[10000-90000]#[YYYYMMDDHHmmSS]#[4 char suffix hash]

Population format: 
loop 10000-90000, fixed suffix hash:
    generate timestamp and location tuples [1-10]:
        create then populate

        write to file stream so we know what data there is
        
'''

import requests
from datetime import datetime
from random import randrange, randint

URL = 'http://127.0.0.1:8080/api'

VENDOR_RANGE = (10000, 99999)
SUFFIX_RANGE = (1000, 9999)
# Aug 26, 2021 to August 8, 2022 in epoch seconds
TIME_RANGE = (1630000000, 1660000000)
LOCATIONS = (
    'Louisville', 'Philadelphia', 'Dallas', 'Ontario', 'Rockford', 'Hamilton', 'Miami', 'New York', 'New Jersey', 'Mountain View'
)
LOCATION_FINAL = 'DELIVERED'


def postURL(endpoint, body={}):
    print(URL+endpoint)
    x = requests.post(URL+endpoint, json=body)
    print(x)
    return x


def generateRowsForVendor(vendor):
    '''
    given vendor, create a row key by randomizing a timestamp > TIMESTAMP_BASE and attaching a randomized suffix
    return row keys
    '''
    pass


def generateSuffix():
    return SUFFIX_RANGE[randrange(len(SUFFIX_RANGE))]


def generateLocation():
    return LOCATIONS[randrange(len(LOCATIONS))]


def generateDelivered():
    if randrange(2) == 1:
        return LOCATION_FINAL
    else:
        return generateLocation()


def generateLocations():
    return [generateLocation() for i in range(randrange(1, 7))] + [generateDelivered()]


def generateTimestamp():
    return datetime.fromtimestamp(
        randint(*TIME_RANGE)).strftime('%Y%m%d%H%M%S')


def createAndPopulateRow(rowkey, locations):
    # create a row
    postURL('/create', {
        'packageId': rowkey,
        'packageLocation': locations[0]
    })
    # update row with new locations
    [postURL('/update', {
        'packageId': rowkey,
        'packageLocation': loc
    }) for loc in locations[1:]]


def main():

    postURL('/test/clear')

    # generate rows for each vendor
    for vendor in range(*VENDOR_RANGE):
        # for each vendor, generate up to n rows
        for i in range(randrange(10)):
            # create row key and locations
            rowkey = str(vendor) + generateTimestamp() + str(generateSuffix())
            locations = generateLocations()

            # create matching bigtable row
            createAndPopulateRow(rowkey, locations)


if __name__ == '__main__':
    main()
