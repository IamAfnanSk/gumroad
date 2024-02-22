import * as React from 'react'
import { FaStar } from 'react-icons/fa6'
import { Product } from '@/types'
import { toast } from 'sonner'

type Props = {
  product: Partial<Product>
}

const ProductCard = ({ product }: Props) => {
  return (
    <div
      onClick={() => toast('Product page is WIP 🚧')}
      className="border rounded-lg flex flex-col cursor-pointer hover:shadow-[0.3rem_0.3rem_0] active:shadow-none transition-all ease-out delay-100"
    >
      <div className="aspect-w-3 aspect-h-3">
        <img
          src={product.cover_image_url}
          className="w-full h-hull object-cover"
          alt={product.name}
        />
      </div>
      <div className="border-b px-5 py-4 flex-1">
        <p className="text-xl">{product.name}</p>
      </div>
      <div className="flex items-center">
        <div className="flex-1 px-5 flex items-center gap-2">
          <FaStar />
          <p>No ratings</p>
        </div>
        <div className="py-4 px-5 border-l">${product.price}</div>
      </div>
    </div>
  )
}

export { ProductCard }
