const defaultState = {
    dataSource : [
        {
            key: '1',
            name: 'Mike',
            from: [51.519, -0.12],
            to: [51.500, -0.09],
            zoom: 13,
             polyline: [
                [51.501, -0.09],
                [51.51, -0.1],
                [51.51, -0.12],
            ],
            multiPolyline: [
                [
                    [51.510, -0.12],
                    [51.520, -0.12],
                ],
            ],
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            zoom: 12,
            from: [51.52, -0.12],
            to: [51.515, -0.09],
            polyline: [
                [51.514, -0.09],
                [51.51, -0.1],
                [51.51, -0.12],
            ],
            multiPolyline: [
                [
                    [51.510, -0.12],
                    [51.520, -0.12],
                ],
            ],
            address: '10 Downing Street',
        },
    ],
    selectOptionData: [
            {
                name: 'London',
                key: 'london',
                from: [51.52, -0.12],
                to: [51.515, -0.09],
                polyline: [
                    [51.514, -0.09],
                    [51.51, -0.1],
                    [51.51, -0.12],
                ],
                multiPolyline: [
                    [
                        [51.510, -0.12],
                        [51.520, -0.12],
                    ],
                ],
            },
            {
                name: 'Brighton',
                key: 'brighton',
                from: [51.52, -0.12],
                to: [51.515, -0.09],
                polyline: [
                    [51.514, -0.09],
                    [51.51, -0.1],
                    [51.51, -0.12],
                ],
                multiPolyline: [
                    [
                        [51.510, -0.12],
                        [51.520, -0.12],
                    ],
                ],
            },
        ],
}

const TO = "TO"

export const mapReducer = (state = defaultState, action) => {
    switch (action.type){
        case TO:
           return {...state, dataSource: state.dataSource.map(obj => {
                if (obj.key === action.payload.rowOfTableKey) {
                    console.log(action.payload.zoom,"zoomValue")
                    console.log(obj,"obj")
                    return {...obj, to: action.payload.to, name: "sdsadsahgdshb", zoom: 7};
                }
                return obj;
            })}
        default: return state
    }
}


export const mapToAction = (payload) => ({type: TO, payload})