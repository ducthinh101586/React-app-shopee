import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { path } from '../../../Constants/path'
import { purchaseStatus } from '../../../Constants/status'
import useQuery from '../../../hooks/useQuery'
import { getPurchases } from '../user.slice'
import qs from 'query-string'
import * as S from './purchase.style'
import { formatMoney, generateNameId } from '../../../utils/helper'
import { Helmet } from 'react-helmet-async'

export default function Purchase() {
  const [purchases, setPurchases] = useState([])

  const dispatch = useDispatch()

  const query = useQuery()

  const status = useMemo(() => query.status || purchaseStatus.all, [query])

  useEffect(() => {
    dispatch(getPurchases(status))
      .then(unwrapResult)
      .then(res => {
        setPurchases(res.data)
      })
  }, [status, dispatch])

  const handleActive = value => () => Number(value) === Number(status)

  return (
    <div>
      <Helmet>
        <title>Đơn mua</title>
      </Helmet>
      <S.PurchaseTabs>
        <S.PurchaseTabItem to={path.purchase} isActive={handleActive(purchaseStatus.all)}>
          Tất cả
        </S.PurchaseTabItem>

        <S.PurchaseTabItem
          to={{ pathName: path.Purchase, search: `?${qs.stringify({ status: purchaseStatus.waitForConfirmation })}` }}
          isActive={handleActive(purchaseStatus.waitForConfirmation)}
        >
          Chờ xác nhận
        </S.PurchaseTabItem>

        <S.PurchaseTabItem
          to={{ pathName: path.Purchase, search: `?${qs.stringify({ status: purchaseStatus.waitForGetting })}` }}
          isActive={handleActive(purchaseStatus.waitForGetting)}
        >
          Chờ lấy hàng
        </S.PurchaseTabItem>

        <S.PurchaseTabItem
          to={{ pathName: path.Purchase, search: `?${qs.stringify({ status: purchaseStatus.inProgress })}` }}
          isActive={handleActive(purchaseStatus.inProgress)}
        >
          Đang giao
        </S.PurchaseTabItem>

        <S.PurchaseTabItem
          to={{ pathName: path.Purchase, search: `?${qs.stringify({ status: purchaseStatus.delivered })}` }}
          isActive={handleActive(purchaseStatus.delivered)}
        >
          Đã giao
        </S.PurchaseTabItem>

        <S.PurchaseTabItem
          to={{ pathName: path.Purchase, search: `?${qs.stringify({ status: purchaseStatus.cancelled })}` }}
          isActive={handleActive(purchaseStatus.cancelled)}
        >
          Đã Huỷ
        </S.PurchaseTabItem>
      </S.PurchaseTabs>
      <S.PurchaseList>
        {purchases.map(purchase => (
          <S.OrderCart key={purchase._id}>
            <S.OrderCartContent>
              <S.OrderCartDetail>
                <img src={purchase.product.image} alt="" />
                <S.OrderContent>
                  <S.OrderName>{purchase.product.name}</S.OrderName>
                  <S.OrderQuantity>x {purchase.product.buy_count}</S.OrderQuantity>
                </S.OrderContent>
              </S.OrderCartDetail>
              <S.OrderCartPrice>đ{formatMoney(purchase.product.price)}</S.OrderCartPrice>
            </S.OrderCartContent>
            <S.OrderCartButtonsContaner>
              <S.PurchaseButton light={1} to={path.product + `/${generateNameId(purchase.product)}`}>
                Xem sản phẩm
              </S.PurchaseButton>
              <S.TotalPrice>
                <S.TotalPricelabel>Tổng giá tiền</S.TotalPricelabel>
                <S.TotalPricePrice>đ{formatMoney(purchase.product.price * purchase.buy_count)}</S.TotalPricePrice>
              </S.TotalPrice>
            </S.OrderCartButtonsContaner>
          </S.OrderCart>
        ))}
      </S.PurchaseList>
    </div>
  )
}
