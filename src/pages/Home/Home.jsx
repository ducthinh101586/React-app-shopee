import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import SearchItemResult from '../../components/SearchItemResult/SearchItemResult'
import { getCategories, getProducts } from './home.slice'
import * as S from './home.style'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
      .then(unwrapResult)
      .then(res => {
        setCategories(res.data)
      })
  }, [dispatch])

  useEffect(() => {
    const _getProduct = async () => {
      const data = await dispatch(getProducts())
      const res = unwrapResult(data)
      setProducts(res.data)
    }
    _getProduct()
  }, [dispatch])

  return (
    <div>
      <S.Container className="container">
        <S.Side>
          <FilterPanel categories={categories} />
        </S.Side>
        <S.Main>
          <SearchItemResult products={products} />
        </S.Main>
      </S.Container>
    </div>
  )
}
