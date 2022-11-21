import { CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";

import { getCoupons } from '../../redux/actions-exporter'
import Coupon from './_components/_coupon'

const CouponsList = () => {
    const dispatch = useDispatch()
    const coupons = useSelector(state => state.coupon.coupons)
    const couponsPending = useSelector(state => state.coupon.isCouponsPending)
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getCoupons())
    }, [dispatch])

    if (couponsPending) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />

    return (
        <div className='caseback-center'>
            <Swiper
            freeMode={true}
            slidesPerView={"auto"}
            spaceBetween={10}
            style={{ direction: "ltr" }}
            >
                {coupons
                .map((coupon, index) => {
                    return (
                    <SwiperSlide
                        key={index}
                        style={{ width: "auto" }}
                    >
                        <Coupon
                            title={t(coupon.title)}
                            subTitle={coupon.couponCode}
                            discountValue={coupon.discountValue}
                            discountType={coupon.discountType}
                            // key={coupon.id}x
                        />
                    </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>

    )
}

export default CouponsList