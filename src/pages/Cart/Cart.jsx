import React, { useEffect, useState } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import * as S from './cart.style'
import ProductQuantityController from '../../components/ProductQuantityController/ProductQuantityController'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from '../../utils/helper'
import { createNextState, unwrapResult } from '@reduxjs/toolkit'
import { getCartPurchases, updatePurchase } from './cart.slice'

export default function Cart() {
  const purchases = useSelector(state => state.cart.purchases)
  const [localPurchases, setLocalPurchases] = useState(() =>
    createNextState(purchases, draft => {
      draft.forEach(purchase => {
        purchase.disabled = false
        purchase.checked = false
      })
    })
  )

  const dispatch = useDispatch()

  const handleInputQuantity = indexPurchase => value => {
    const newLocalPurchases = createNextState(localPurchases, draft => {
      draft[indexPurchase].buy_count = value
    })
    setLocalPurchases(newLocalPurchases)
  }

  const handleBlurQuantity = indexPurchase => async value => {
    const purchase = localPurchases[indexPurchase]
    setLocalPurchases(loclalPurchases =>
      createNextState(loclalPurchases, draft => {
        draft[indexPurchase].disabled = true
      })
    )
    await dispatch(updatePurchase({ product_id: purchase.product._id, buy_count: value })).then(unwrapResult)
    await dispatch(getCartPurchases()).then(unwrapResult)
    setLocalPurchases(loclalPurchases =>
      createNextState(loclalPurchases, draft => {
        draft[indexPurchase].disabled = false
      })
    )
  }

  const handleIncreaseAndDecrease = indexPurchase => async value => {
    const purchase = localPurchases[indexPurchase]
    setLocalPurchases(loclalPurchases =>
      createNextState(loclalPurchases, draft => {
        draft[indexPurchase].disabled = true
        draft[indexPurchase].buy_count = value
      })
    )
    await dispatch(updatePurchase({ product_id: purchase.product._id, buy_count: value })).then(unwrapResult)
    await dispatch(getCartPurchases()).then(unwrapResult)
    setLocalPurchases(loclalPurchases =>
      createNextState(loclalPurchases, draft => {
        draft[indexPurchase].disabled = false
      })
    )
  }

  useEffect(() => {
    setLocalPurchases(
      createNextState(purchases, draft => {
        draft.forEach(purchase => {
          purchase.disabled = false
        })
      })
    )
  }, [purchases])

  return (
    <div className="container">
      <div>
        <S.ProductHeader>
          <S.ProductHeaderCheckbox>
            <Checkbox />
          </S.ProductHeaderCheckbox>
          <S.ProductHeaderName>Sản Phẩm</S.ProductHeaderName>
          <S.ProductHeaderUnitPrice>Đơn Giá</S.ProductHeaderUnitPrice>
          <S.ProductHeaderQuantity>Số lượng</S.ProductHeaderQuantity>
          <S.ProductHeaderTotalPrice>Số tiền</S.ProductHeaderTotalPrice>
          <S.ProductHeaderAction>Thao tác</S.ProductHeaderAction>
        </S.ProductHeader>
        <S.ProductSection>
          {localPurchases.map((purchase, index) => (
            <S.CartItem key={purchase._id}>
              <S.CartItemCheckbox>
                <Checkbox />
              </S.CartItemCheckbox>
              <S.CartItemOverView>
                <S.CartItemOverViewImage to="">
                  <img src={purchase.product.image} alt="" />
                </S.CartItemOverViewImage>
                <S.CartItemOverViewNameWrapper>
                  <S.CartItemOverViewName>{purchase.product.name}</S.CartItemOverViewName>
                </S.CartItemOverViewNameWrapper>
              </S.CartItemOverView>
              <S.CartItemUnitPrice>
                <span>đ{formatMoney(purchase.product.price_before_discount)}</span>
                <span>đ{formatMoney(purchase.product.price)}</span>
              </S.CartItemUnitPrice>
              <S.CartItemQuantity>
                <ProductQuantityController
                  max={purchase.product.quantity}
                  value={purchase.buy_count}
                  disabled={purchase.disabled}
                  onInput={handleInputQuantity(index)}
                  onBlur={handleBlurQuantity(index)}
                  onIncrease={handleIncreaseAndDecrease(index)}
                  onDecrease={handleIncreaseAndDecrease(index)}
                />
              </S.CartItemQuantity>
              <S.CartItemTotalPrice>
                <span>đ{formatMoney(purchase.product.price * purchase.buy_count)}</span>
              </S.CartItemTotalPrice>
              <S.CartItemAction></S.CartItemAction>
              <S.CartItemActionButton>Xoá</S.CartItemActionButton>
            </S.CartItem>
          ))}
        </S.ProductSection>
      </div>
      <S.CartFooter>
        <S.CartFooterCheckbox>
          <Checkbox />
        </S.CartFooterCheckbox>
        <S.CartFooterButton>Chọn tất cả({purchases.length})</S.CartFooterButton>
        <S.CartFooterButton>Xoá</S.CartFooterButton>
        <S.CartFooterSpaceBetween />
        <S.CartFooterPrice>
          <S.CartFooterPriceTop>
            <div>Tổng Thanh toán({purchases.length} sản phẩm)</div>
            <div>đ20000</div>
          </S.CartFooterPriceTop>
          <S.CartFooterPriceBot>
            <div>Tiết Kiệm</div>
            <div>đ2000</div>
          </S.CartFooterPriceBot>
        </S.CartFooterPrice>
        <S.CartFooterCheckout>mua hàng</S.CartFooterCheckout>
      </S.CartFooter>
    </div>
  )
}
