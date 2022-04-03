import {Select, Space, Table} from "antd";
import {Circle, CircleMarker, MapContainer, Polyline, Popup, TileLayer} from "react-leaflet";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {mapToAction} from "../store/mapReducer";

const Index = () => {
    const { Option } = Select;
    const center = [51.505, -0.09]
    const fillBlueOptions = { fillColor: 'blue' }
    const limeOptions = { color: 'lime' }
    const redOptions = { color: 'red' }

    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const [dataSource,setDataSource] = useState(selector.map.dataSource)
    const [selectOptionData,setSelectOptionData] = useState(selector.map.selectOptionData)
    const [rowOfTableKey, setRowOfTableKey] = useState()
    const [to, setTo] = useState([]);
    const [routeFrom, setRouteFrom] = useState([51.519, -0.12])
    const [routeTo, setRouteTo] = useState([51.500, -0.09])
    const [polyline,setPolyline] = useState([[51.501, -0.09],
        [51.51, -0.1],
        [51.51, -0.12]])
    const [multiPolyline, setMultiPolyline] = useState([
        [51.510, -0.12],
        [51.520, -0.12]
    ])
    const [zoom,setZoom] = useState(13)

    const handleConfirm = (e) => {
        e.stopPropagation();
    }

    useEffect(() => {
        setDataSource(selector.map.dataSource)
    },[selector])

    useEffect(() => {
        if(to === "Brighton"){
            setZoom(7);
            setRouteTo([50.869, -0.09]);
            setPolyline ([[50.869, -0.09],
                [51.51, -0.1],
                [51.51, -0.12]])
        }
        dispatch(mapToAction({to: routeTo,rowOfTableKey}))
    },[to,rowOfTableKey]);

    const handleChangeTo = (value) => {
        setTo(value)
    }

    const setRowClassName = (record) => {
        return record.key === rowOfTableKey ? 'clickRowStyl' : '';
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
            render: (text, record) => (
                <Space size="middle">
                    <Select defaultValue="london" className='select'>
                        <Option value="from-london">London</Option>
                    </Select>
                </Space>
            ),
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
            render: (text, record) => (
                <Space size="middle" onClick={handleConfirm}>
                    <Select defaultValue="london" className='select' onChange={handleChangeTo}>
                        {selectOptionData.map((item) =>{
                            return <Option key={item.key} value={item.name}>{item.name}</Option>
                        })
                        }
                    </Select>
                </Space>
            ),
        },
    ];

    const onClickRow = (record) => {
        return {
            onClick: () => {
                console.log(record)
                setRowOfTableKey(
                    record.key,
                );
                setRouteFrom(record.from);
                setRouteTo(record.to)
                setPolyline(record.polyline);
                setMultiPolyline(record.multiPolyline)
                setZoom(record.zoom)
            },
        };
    }

    return(
        <div className="container">
            <div className='column resizable'>
                <h1>REACT TASK 1</h1>
                <Table dataSource={dataSource} columns={columns} onRow={onClickRow}  className='table-border' rowClassName={setRowClassName}
                />
            </div>
            <div className='column w-auto'>
                <MapContainer center={center} zoom={zoom}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circle center={routeFrom} pathOptions={fillBlueOptions} radius={200} />
                    <CircleMarker
                        center={routeTo}
                        pathOptions={redOptions}
                        radius={20}>
                        <Popup>Popup in CircleMarker</Popup>
                    </CircleMarker>
                    <Polyline pathOptions={limeOptions} positions={polyline} />
                    <Polyline pathOptions={limeOptions} positions={multiPolyline} />
                </MapContainer>
            </div>
        </div>
    )
}

export default Index;