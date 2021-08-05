import React from 'react'
import * as S from './purchase.style'

export default function Purchase() {
  return (
    <div>
      <S.PurchaseTabs>
        <S.PurchaseTabItem to="">Tất cả</S.PurchaseTabItem>

        <S.PurchaseTabItem to="">Chờ xác nhận</S.PurchaseTabItem>

        <S.PurchaseTabItem to="">Chờ lấy hàng</S.PurchaseTabItem>

        <S.PurchaseTabItem to="">Đang giao</S.PurchaseTabItem>

        <S.PurchaseTabItem to="">Đã giao</S.PurchaseTabItem>

        <S.PurchaseTabItem to="">Đã Huỷ</S.PurchaseTabItem>
      </S.PurchaseTabs>
      <S.PurchaseList>
        <S.OrderCart>
          <S.OrderCartContent>
            <S.OrderCartDetail>
              <img src="https://cf.shopee.vn/file/35cc62f31659de127a77af068f6bab9d_tn" alt="" />
              <S.OrderContent>
                <S.OrderName>Băng Đô Cài Tóc Hình Cá Mập Xinh Xắn</S.OrderName>
                <S.OrderQuantity>x 1</S.OrderQuantity>
              </S.OrderContent>
            </S.OrderCartDetail>
            <S.OrderCartPrice>đ2000</S.OrderCartPrice>
          </S.OrderCartContent>
          <S.OrderCartButtonsContaner>
            <S.PurchaseButton light={1} to="">
              Xem sản phẩm
            </S.PurchaseButton>
            <S.TotalPrice>
              <S.TotalPricelabel>Tổng giá tiền</S.TotalPricelabel>
              <S.TotalPricePrice>đ2000</S.TotalPricePrice>
            </S.TotalPrice>
          </S.OrderCartButtonsContaner>
        </S.OrderCart>
      </S.PurchaseList>
    </div>
  )
}
