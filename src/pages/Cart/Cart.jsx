import React, { useEffect, useState } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import * as S from './cart.style'
import ProductQuantityController from '../../components/ProductQuantityController/ProductQuantityController'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from '../../utils/helper'
import { createNextState, unwrapResult } from '@reduxjs/toolkit'
import { deletePurchases, getCartPurchases, updatePurchase } from './cart.slice'
import { toast } from 'react-toastify'
import { format } from 'prettier'

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
  const isCheckedAll = localPurchases.every(purchase => purchase.checked)
  const checkedPurchases = localPurchases.filter(purchase => purchase.checked)
  const totalCheckedPurchases = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)

  const totalCheckedPurchasesSavingPrice = checkedPurchases.reduce((result, current) => {
    return (result + current.product.price_before_discount - current.product.price) * current.buy_count
  }, 0)

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

  const handleRemove = indexPurchase => async () => {
    const purchase_id = localPurchases[indexPurchase]._id
    await dispatch(deletePurchases([purchase_id])).then(unwrapResult)
    await dispatch(getCartPurchases()).then(unwrapResult)
    toast.success('xoá đơn thành công', {
      position: 'top-center',
      autoClose: 2000
    })
  }

  const handleRemoveManyPurchases = async () => {
    const purchase_ids = checkedPurchases.map(purchase => purchase._id)
    await dispatch(deletePurchases(purchase_ids)).then(unwrapResult)
    await dispatch(getCartPurchases()).then(unwrapResult)
    toast.success('xoá đơn thành công', {
      position: 'top-center',
      autoClose: 2000
    })
  }

  const handleCheck = indexPurchase => value => {
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].checked = value
      })
    )
  }

  const handleCheckAll = () => {
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft.forEach(purchase => {
          purchase.checked = !isCheckedAll
        })
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
            <Checkbox onChange={handleCheckAll} checked={isCheckedAll} />
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
                <Checkbox checked={purchase.checked} onChange={handleCheck(index)} />
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
              <S.CartItemActionButton onClick={handleRemove(index)}>Xoá</S.CartItemActionButton>
            </S.CartItem>
          ))}
        </S.ProductSection>
      </div>
      <S.CartFooter>
        <S.CartFooterCheckbox>
          <Checkbox onChange={handleCheckAll} checked={isCheckedAll} />
        </S.CartFooterCheckbox>
        <S.CartFooterButton onClick={handleCheckAll}>Chọn tất cả({purchases.length})</S.CartFooterButton>
        <S.CartFooterButton onClick={handleRemoveManyPurchases}>Xoá</S.CartFooterButton>
        <S.CartFooterSpaceBetween />
        <S.CartFooterPrice>
          <S.CartFooterPriceTop>
            <div>Tổng Thanh toán({totalCheckedPurchases} sản phẩm)</div>
            <div>đ{formatMoney(totalCheckedPurchasesPrice)}</div>
          </S.CartFooterPriceTop>
          <S.CartFooterPriceBot>
            <div>Tiết Kiệm</div>
            <div>đ{formatMoney(totalCheckedPurchasesSavingPrice)}</div>
          </S.CartFooterPriceBot>
        </S.CartFooterPrice>
        <S.CartFooterCheckout>mua hàng</S.CartFooterCheckout>
      </S.CartFooter>
    </div>
  )
}
