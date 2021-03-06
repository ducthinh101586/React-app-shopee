import React, { useEffect, useState } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import * as S from './cart.style'
import ProductQuantityController from '../../components/ProductQuantityController/ProductQuantityController'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from '../../utils/helper'
import { createNextState, unwrapResult } from '@reduxjs/toolkit'
import { buyPurchases, deletePurchases, getCartPurchases, updatePurchase } from './cart.slice'
import { toast } from 'react-toastify'
import keyBy from 'lodash/keyBy'
import { Helmet } from 'react-helmet-async'

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
    toast.success('xo?? ????n th??nh c??ng', {
      position: 'top-center',
      autoClose: 1500
    })
  }

  const handleRemoveManyPurchases = async () => {
    const purchase_ids = checkedPurchases.map(purchase => purchase._id)
    await dispatch(deletePurchases(purchase_ids)).then(unwrapResult)
    await dispatch(getCartPurchases()).then(unwrapResult)
    toast.success('xo?? ????n th??nh c??ng', {
      position: 'top-center',
      autoClose: 1500
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

  const handleBuyPurchases = async () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map(purchase => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      await dispatch(buyPurchases(body)).then(unwrapResult)
      await dispatch(getCartPurchases()).then(unwrapResult)
      toast.success('?????t h??ng th??nh c??ng', {
        position: 'top-center',
        autoClose: 1500
      })
    }
  }

  useEffect(() => {
    setLocalPurchases(localPurchases => {
      const localPurchasesObject = keyBy(localPurchases, '_id')
      return createNextState(purchases, draft => {
        draft.forEach(purchase => {
          purchase.disabled = false
          purchase.checked = Boolean(localPurchasesObject[purchase._id]?.checked)
        })
      })
    })
  }, [purchases])

  return (
    <div className="container">
      <Helmet>
        <title>Gi??? H??ng</title>
      </Helmet>
      <div>
        <S.ProductHeader>
          <S.ProductHeaderCheckbox>
            <Checkbox onChange={handleCheckAll} checked={isCheckedAll} />
          </S.ProductHeaderCheckbox>
          <S.ProductHeaderName>S???n Ph???m</S.ProductHeaderName>
          <S.ProductHeaderUnitPrice>????n Gi??</S.ProductHeaderUnitPrice>
          <S.ProductHeaderQuantity>S??? l?????ng</S.ProductHeaderQuantity>
          <S.ProductHeaderTotalPrice>S??? ti???n</S.ProductHeaderTotalPrice>
          <S.ProductHeaderAction>Thao t??c</S.ProductHeaderAction>
        </S.ProductHeader>
        <S.ProductSection>
          {localPurchases.map((purchase, index) => (
            <S.CartItem key={purchase._id}>
              <S.CartItemCheckbox>
                <Checkbox checked={purchase.checked} onChange={handleCheck(index)} />
              </S.CartItemCheckbox>
              <S.CartItemOverView>
                <S.CartItemOverViewImage to="/">
                  <img src={purchase.product.image} alt="" />
                </S.CartItemOverViewImage>
                <S.CartItemOverViewNameWrapper>
                  <S.CartItemOverViewName to="name product">{purchase.product.name}</S.CartItemOverViewName>
                </S.CartItemOverViewNameWrapper>
              </S.CartItemOverView>
              <S.CartItemUnitPrice>
                <span>??{formatMoney(purchase.product.price_before_discount)}</span>
                <span>??{formatMoney(purchase.product.price)}</span>
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
                <span>??{formatMoney(purchase.product.price * purchase.buy_count)}</span>
              </S.CartItemTotalPrice>
              <S.CartItemAction></S.CartItemAction>
              <S.CartItemActionButton onClick={handleRemove(index)}>Xo??</S.CartItemActionButton>
            </S.CartItem>
          ))}
        </S.ProductSection>
      </div>
      <S.CartFooter>
        <S.CartFooterCheckbox>
          <Checkbox onChange={handleCheckAll} checked={isCheckedAll} />
        </S.CartFooterCheckbox>
        <S.CartFooterButton onClick={handleCheckAll}>Ch???n t???t c???({purchases.length})</S.CartFooterButton>
        <S.CartFooterButton onClick={handleRemoveManyPurchases}>Xo??</S.CartFooterButton>
        <S.CartFooterSpaceBetween />
        <S.CartFooterPrice>
          <S.CartFooterPriceTop>
            <div>T???ng Thanh to??n({totalCheckedPurchases} s???n ph???m)</div>
            <div>??{formatMoney(totalCheckedPurchasesPrice)}</div>
          </S.CartFooterPriceTop>
          <S.CartFooterPriceBot>
            <div>Ti???t Ki???m</div>
            <div>??{formatMoney(totalCheckedPurchasesSavingPrice)}</div>
          </S.CartFooterPriceBot>
        </S.CartFooterPrice>
        <S.CartFooterCheckout onClick={handleBuyPurchases}>mua h??ng</S.CartFooterCheckout>
      </S.CartFooter>
    </div>
  )
}
