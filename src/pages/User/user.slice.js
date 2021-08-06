import { createAsyncThunk } from '@reduxjs/toolkit'
import purchaseApi from '../../api/purchase.api'
import { payloadCreator } from '../../utils/helper'

export const getPurchases = createAsyncThunk('cart/getPurchases', payloadCreator(purchaseApi.getPurchases))
