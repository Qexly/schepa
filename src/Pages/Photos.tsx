import {ReactElement} from 'react';
import PageLayout from 'Modules/PageLayout';
import Slider from 'Componenets/Slider';
import Styles from './Photos/styles.module.css';
import {PHOTOS} from 'CONSTANTS';

const Photos = (): ReactElement => {
    return (
        <PageLayout>
            <div className={Styles.Container}>
                <Slider items={PHOTOS} className={Styles.Slider} photoContainerClass={Styles.PhotoContainerClass} />
            </div>
        </PageLayout>
    )
};

export {
    Photos as Component
}

