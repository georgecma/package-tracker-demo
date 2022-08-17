import React from 'react'

export const ResultForm = (props) => {
    const timestampToHumanReadable = (timestamp) => {
        return new Date(parseInt(timestamp) / 1000).toDateString()
    }
    const unpack = (data) => {
        const displayDict = {};
        Object.keys(data).forEach(packageId => {
            displayDict[packageId] = [];
            console.log(data[packageId])
            data[packageId].locations.value.forEach(locationData => {
                displayDict[packageId].push([
                    timestampToHumanReadable(locationData.timestamp),
                    locationData.value
                ])
            })
        })
        return displayDict
    }
    try {
        const displayDict = unpack(props.displayData)
        return <div>
            {Object.entries(displayDict).map(([packageId, locationArr]) => {
                return (
                    <>
                        <div>Package ID: {packageId}</div>
                        {
                            locationArr.map(([timestamp, location]) => (
                                <div>{timestamp} - {location}</div>
                            ))
                        }
                    </>

                )
            })}
        </div>
    } catch (err) {
        console.log('Unable to parse result')
    }

    return <div>test2</div>
}