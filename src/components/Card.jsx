import localProductList from '../data';
import Button from '@mui/material/Button'
import { useState } from 'react'
const Card = () => {
    const [limit, setLimit] = useState(5)
    const Product = localProductList.slice(0, limit)

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
        <div className='flex flex-row border flex-wrap'>
            {Product.map((item) => {
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
            <div>
                <Button onClick={handleClick}>view more</Button>
                <Button onClick={handleViewLess}>view less</Button>
            </div>
        </div>
    )
};

export default Card;