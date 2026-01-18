import AddCategories from '@/components/AddCategories';
import AddProduct from '@/components/AddProduct'
import { getCategories } from '@/utils/firebase';
import React from 'react'

export default async function AdminCategories() {
  const categories = await getCategories();

  return (
    <div className=''>
      <AddCategories />
    </div>
  )
}
