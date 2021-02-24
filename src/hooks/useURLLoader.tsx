/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';

const useURLLoader = (url: string, deps: any[] = []) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');
    useEffect(() => {
        // setLoading(true);
        console.log('执行 useEffect 回调', loading);
        axios.get(url)
             .then(value => {
                console.log('get 请求成功', loading);
                setData(value.data);
                setLoading(false);
                 console.log('axios 成功请求回调执行完毕', loading);
             })
             .catch(reason => {
                setErr(reason.toString());
                setLoading(false);
             })
    }, [...deps, url]);

    console.log('useURLLoader will return', loading);
    return [data, loading, err];
}

export default useURLLoader;