import React, { useEffect, useState } from 'react'
import { Button, Skeleton } from '@mui/material'
import Card from '../components/Card'



function Banner() {
    const [banner, setBanner] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(5)
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`https://dummyjson.com/products?limit=${limit}`)
            const data = await res.json()
            const { products } = data
            setBanner(products)
            setLoading(false)
        }
        fetchProducts()
    }, [limit])
    const handleClick = () => {
        setLimit(limit + 5)
    }
    const handleViewLess = () => {
        if (limit <= 5) {
            alert('you can not view less')
            return
        }
        setLimit(limit - 5)
    }
    return (
        loading ?
            <Skeleton height={"100%"} /> :
            <>
                <div className='flex flex-row border flex-wrap'>
                    {banner.map((item) => {
                        return (
                            <div key={item.id} className='w-[19%] border flex flex-wrap flex-col'>
                                <img src={item.thumbnail} alt={item.title} width={300} height={300}
                                    className='h-[40%]' />
                                <div className=''>
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Button onClick={handleClick}>view more</Button>
                    <Button onClick={handleViewLess}>view less</Button>
                </div>

            </>

    )
}

export default Banner