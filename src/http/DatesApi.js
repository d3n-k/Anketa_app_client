import { $host } from ".";

export const fetchDates = async () => {
    const {data} = await $host.get('/dates');
    return data;
}

export const fetchOneDate = async (id) => {
    const {data} = await $host.get('/dates/' + id);
    return data;
}

export const deleteDates = async (id) => {
    const {data} = await $host.delete('/dates/' + id);
    return data;
}

export const createDates = async (d) => {
    const {data} = await $host.post('/dates', d);
    return data;
}

export const updateDates = async (id, sel) => {
    const {data} = await $host.put('/dates/' + id, sel);
    return data;
}

