import { createAsyncThunk } from '@reduxjs/toolkit'
import productApi from '../../api/product.api'
import { payloadCreator } from '../../utils/helper'

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  payloadCreator(productApi.getProductDetail)
)
