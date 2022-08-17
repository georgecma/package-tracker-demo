import React from 'react'

export const DisplayForm = (props) => {
    const timestampToHumanReadable = (timestamp) => {
        return new Date(parseInt(timestamp) / 1000).toLocaleString('en-US')
    }
    const unpack = (data) => {
        const displayDict = {};
        Object.keys(data).forEach(packageId => {
            displayDict[packageId] = [];
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
            <h2>Package Lookup Result</h2>
            {Object.entries(displayDict).map(([packageId, locationArr]) => {
                return (
                    <>
                        <div>Package ID: {packageId}</div>
                        {
                            locationArr.map(([timestamp, location]) => (
                                <div>{timestamp} - {location}</div>
                            ))
                        }
                        <br />
                    </>

                )
            })}
        </div>
    } catch (err) {
        return <div>
            <h2>Package Lookup Result</h2>
            <div>Unable to parse result.</div>
        </div>
    }


}