import React from 'react';
import TriangleSvg from "/public/images/triangle-bg.svg";
import style from './triangle.module.scss';

export const Triangle = () => {
    return (
        <div className={style.triangle}>
            <div className={style.triangleBg}>
                <TriangleSvg role="presentation" />
            </div>
        </div>
    )
}

