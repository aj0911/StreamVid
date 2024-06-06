import { useState, useEffect } from 'react'
import api from 'axios'

const useFetch = (urls,arr=[],timeoutObj = {use:false,time:0}) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error,setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const responses = await Promise.all(urls.map(url => fetch(url)));
            const jsonData = await Promise.all(responses.map(response => response.json()));
            setData(jsonData);
        } catch (err) {
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }
    if(timeoutObj.use){
        const timer = setTimeout(() => {
            fetchData();
        }, timeoutObj.time);
        return ()=>clearTimeout(timer)
    }
    fetchData()

    // Cleanup function
    return () => {
        setData([]);
        setIsLoading(false);
        setError(null);
    };
  }, arr)
    
  return [data, isLoading,error]
}
export default useFetch