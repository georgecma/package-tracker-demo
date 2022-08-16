import React from 'react'

const unpack = (data) => {
    const dict = {}
    Object.keys(data).forEach(k => {
        dict[k] = []
        const locs = data[k].locations
        Object.entries(locs).forEach(([timestamp, locArray]) => {
            dict[k].push(
                [timestamp, locArray[0].value]
            )
        }
        )
    })
    return dict
}

export const DisplayPackageDiv = (props) => {
    if (!props.displayData) {
        return <div></div>
    }
    const data = props.displayData
    console.log(data)
    console.log('t', unpack(data))
    const unpackedData = unpack(data)
    return <div>
        {Object.keys(unpackedData).map(key => {
            return (
                <>
                    <div>Package {key}: </div>
                    {
                        unpackedData[key].map(entry => {
                            return <div>{entry[0]} : {entry[1]}</div>
                        })
                    }
                </>
            )
        }
        )
        }


    </div>
}