import React from 'react'
import { useTranslation } from 'react-i18next'

import couponCover from '../../../assets/images/couponCover.jpg'

const Coupon = ({ title, discountType, discountValue, subTitle, image, backgroundColor = '#0d47a1', style}) => {
    const isTypePercent = discountType === 'percent' ? '%' : discountType
    const { t } = useTranslation()

    return (
        <div
            className="caseback-box"
            style={{
                backgroundImage: `url(${couponCover})`,
                backgroundColor,
                width: '363px',
                ...style
            }}
        >
            <div className="caseback-boxInner">
                <h4 className="casebackBox-Title">
                    {title}
                </h4>
                <h5 className="casebackBox-subTitle">
                    {subTitle}
                </h5>
                <h6 className="casebackBox-offer">
                    {t("upto")} <span>{discountValue} {isTypePercent}</span>
                </h6>
            </div>
        </div>
    );
}

export default Coupon