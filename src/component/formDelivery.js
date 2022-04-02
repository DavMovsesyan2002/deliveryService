import {Button, Input, Select} from "antd";
import {getResult} from "../api/api";
import {useEffect, useState} from "react";

const FormDelivery = () => {
    const { Option } = Select;

    const [sourceKladr, setSourceKladr] = useState('moscow')
    const [targetKladr, setTargetKladr] = useState('voronezh')
    const [weight, setWeight] = useState('')
    const [delivery, setDelivery] = useState('slow')

    const [disabledButton,setDisabledButton] = useState(true)

    const [price,setPrice] = useState()
    const [date,setDate] = useState()
    const [error,setError] = useState()

    const handleFormSubmit = (event) => {
        event.preventDefault()
        getResult(sourceKladr,targetKladr,weight,delivery).then(data => {
            setPrice(data.price);
            setDate(data.date);
            setError(data.error);
        });
    }

    const handleChangeSourceKladr = (value) => {
        setSourceKladr(value)
    }

    const handleChange = (event) => {
        setWeight(event.target.value)

    }

    useEffect(() => {
        if(weight){
            setDisabledButton(false)
        }else{
            setDisabledButton(true)

        }
    },[weight])

    const handleChangeTargetKladr = (value) => {
        setTargetKladr(value)
    }

    return(
        <div className='php-container'>
            <h1>PHP TASK 2</h1>
            <div className='delivery-buttons-container'>
                <Button type='primary' onClick={() => setDelivery('slow')}>Медленная доставка</Button>
                <Button type='primary' className='ml-5' onClick={() => setDelivery('fast')}>Быстрая доставка</Button>
            </div>
            <div className='form-container'>
                <div className='mt-10'>откуда</div>
                <Select className='mt-10 ' onChange={handleChangeSourceKladr } defaultValue={sourceKladr} style={{ width: 120 }}>
                    <Option value="Moscow">Москва</Option>
                </Select>
                <div className='mt-10'>куда</div>
                <Select className='mt-10 ' onChange={handleChangeTargetKladr } defaultValue={targetKladr} style={{ width: 120 }}>
                    <Option value="voronezh">Воронеж</Option>
                    <Option value="sochi">Сочи</Option>
                    <Option value="erevan">Ереван</Option>
                    <Option value="krasnodar">Краснодар</Option>
                </Select>
                <div className='mt-10'>размер</div>
                <Input className='mt-10 w-200' placeholder="размер" onChange={handleChange} value={weight} type='number' />
                <Button className='mt-10 w-200' type="primary" disabled={disabledButton} onClick={handleFormSubmit}>Рассчитать</Button>
            </div>
            <div className='mt-10'>стоимость: {price} </div>
            <div className='mt-10'>дата доставки: {date}</div>
            <div className='mt-10'>размер: {weight}</div>
            <div className='mt-10'>доставка:  {delivery}</div>
        </div>
    )
}

export default FormDelivery