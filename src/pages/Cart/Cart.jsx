import React from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import * as S from './cart.style'
import ProductQuantityController from '../../components/ProductQuantityController/ProductQuantityController'
import { useSelector } from 'react-redux'
import { formatMoney } from '../../utils/helper'

export default function Cart() {
  const purchases = useSelector(state => state.cart.purchases)
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
          {purchases.map(purchase => (
            <S.CartItem key={purchase._id}>
              <S.CartItemCheckbox>
                <Checkbox />
              </S.CartItemCheckbox>
              <S.CartItemOverView>
                <S.CartItemOverViewImage to="/">
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
                <ProductQuantityController max={purchase.product.quantity} value={purchase.buy_count} />
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
