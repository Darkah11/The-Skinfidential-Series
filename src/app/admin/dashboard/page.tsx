import AddProduct from '@/components/AddProduct'
import { getCategories } from '@/utils/firebase';
import React from 'react'

export default async function Dashboard() {
  const categories = await getCategories();

  return (
    <div className=''>
      <AddProduct categories={categories} />
    </div>
  )
}
