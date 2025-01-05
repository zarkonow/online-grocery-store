import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function CartItemList({cartItemList}) {




  return (
    <div >
     
     <div>
        {
          cartItemList.map((cart, index) => (
            <div className='flex justify-between items-center p-2 mb-5' key={index}>


              <div className='flex gap-6 items-center'> 
              
             <Image
                     src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+cart.image}
                     alt={cart.name}
                     width={90}
                     height={90}
                     className="object-contain bg-green-50"
                   />
                   <div>
              <h2>{cart.name}</h2>
              <h2>Quantity: {cart.quantity}</h2>
              <h2 className='text-lg font-bold'>$ {cart.amount}</h2>
              </div>
              </div>
              <TrashIcon className=' cursor-pointer' />
            </div>
          ))
        }
     
    </div>
    </div>
  )
}

export default CartItemList