import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost/deliveryService/backend/Fast_delivery/',
    headers: {
        'Accept': 'application/vnd.GitHub.v3+json',
    },
});

export const getResult = (sourceKladr,targetKladr,weight,delivery) => {
    return instance.post('', {from: sourceKladr,where: targetKladr,weight: weight,delivery:delivery})
    .then(response => {
        return response.data
    })
}