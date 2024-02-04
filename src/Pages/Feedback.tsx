import {ReactElement} from 'react';
import PageLayout from 'Modules/PageLayout';
import Styles from './Feedback/styles.module.css';
import classNames from 'classnames';
import FeedbackImg from 'Assets/imgs/feedback/main.png'
import Slider from 'Componenets/Slider';
import {FEEDBACK} from 'CONSTANTS';

const productLink = 'https://www.ozon.ru/product/shchepa-olha-premium-vysshiy-sort-9l-5l-3l-1315987808/?asb=ZjjeNLzx7oku7cy1M%252Fr3nXEtsWlNqJhsjS4nOv61FzosE1ENnKd53dKXXyVQ1bU2&asb2=wagnp-g9WT4tigH02ymGqVYmIF8_I3bweyWMptYy9sG7ofmftLYZt5r1PHZ8Rhy4Bg07xZZdY39a4R1F0oJrMU7IVUWQ6qIr7kOOXZGao72Mm99JcMG5jLJGTj10dT5A0mIbxSUKSFXFahGdCcfpF6X2esw4SRmT1WTLpA8cXkXsiVVY9lJIw5NapAI_rb1n&avtc=1&avte=2&avts=1707061010&from_sku=1315983705&from_url=https%253A%252F%252Fwww.ozon.ru%252Fsearch%252F%253Ffrom_global%253Dtrue%2526text%253Dproper%252Bhouse&keywords=proper+house&oos_search=false';

const Feedback = (): ReactElement => {
    return (
        <PageLayout>
            <div className={classNames(Styles.Container, 'fullHeight')}>
                <h1 className={Styles.Title}>
                    Отзывы покупателей
                </h1>
                <p className={Styles.FeedbackText}>
                    Покупатели на <span className={Styles.Ozon}>OZON</span> высоко оценили качество нашей щепы. <br />
                    По 
                    &ensp;<a href={productLink} target="_blank" className={Styles.Ozon}>ссылке</a>&ensp;
                    вы можете ознакомится с их мнением более подробно.
                </p>
                <div className={Styles.FeedbackImgContainer}>
                    <img src={FeedbackImg} className={Styles.FeedbackImg} />
                </div>

                <Slider items={FEEDBACK} photoContainerClass={Styles.PhotoContainerClass} className={Styles.Slider}/>

            </div>
        </PageLayout>
    )
};

export {
    Feedback as Component
}
