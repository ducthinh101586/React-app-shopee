import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import SearchItemResult from '../../components/SearchItemResult/SearchItemResult'
import useQuery from '../../hooks/useQuery'
import { getCategories, getProducts } from './home.slice'
import * as S from './home.style'
import { Helmet } from 'react-helmet-async'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState({
    products: [],
    pagination: {}
  })
  const [filters, setFilters] = useState({})

  const dispatch = useDispatch()

  const query = useQuery()

  useEffect(() => {
    dispatch(getCategories())
      .then(unwrapResult)
      .then(res => {
        setCategories(res.data)
      })
  }, [dispatch])

  useEffect(() => {
    const _filters = {
      ...query,
      page: query.page || 1,
      limit: query.limit || 20,
      sortBy: query.sortBy || 'view'
    }
    setFilters(_filters)

    const params = {
      page: _filters.page,
      limit: _filters.limit,
      category: _filters.category,
      exclude: _filters.exclude,
      rating_filter: _filters.rating,
      price_max: _filters.maxPrice,
      price_min: _filters.minPrice,
      sort_by: _filters.sortBy,
      order: _filters.order,
      name: _filters.name
    }
    const _getProduct = async () => {
      const data = await dispatch(getProducts({ params }))
      const res = unwrapResult(data)
      setProducts(res.data)
    }
    _getProduct()
  }, [query, dispatch])

  return (
    <div>
      <Helmet>
        <title>MyShop Việt Nam | mua bán trên ứng dụng di động hoặc Website</title>
      </Helmet>
      <S.Container className="container">
        <S.Side>
          <FilterPanel categories={categories} filters={filters} />
        </S.Side>
        <S.Main>
          <SearchItemResult products={products} filters={filters} />
        </S.Main>
      </S.Container>
    </div>
  )
}
