import {ReactElement, useCallback, MouseEvent} from 'react';
import Styles from './MobilePanel/styles.module.css';
import classNames from 'classnames';
import Close from 'Assets/imgs/menu/close.png';
import {INavItem} from 'CONSTANTS';
import Item from 'Componenets/Menu/Item';
import {PHONE, MAIL} from 'CONSTANTS';
import mailImg from 'Assets/imgs/mail.png';
import phoneImg from 'Assets/imgs/phone.png';

interface IProps {
    opened: boolean;
    onClose: Function;
    items: INavItem[];
}

const MobilePanel = ({opened, onClose, items}: IProps): ReactElement => {
    const onLayoutClick = useCallback((e: MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && onClose(), [onClose]);

    return (
        <div className={classNames({[Styles.Layout]: opened})}
        onClick={(e) => onLayoutClick(e)}>
            <div className={classNames(Styles.Container, {[Styles.Opened]: opened})}>
                {
                    items.map((item) => <Item key={item.title} item={item} className={Styles.Item} />)
                }
                <div className={classNames(Styles.Contacts)}>
                    <div className={Styles.Contact}>
                        <img src={phoneImg} className={Styles.ContantImg} />
                        <a href={`tel:${PHONE.tel}`}>
                            <span>{PHONE.view}</span>
                        </a>
                    </div>
                    <div className={Styles.Contact}>
                        <img src={mailImg} className={Styles.ContantImg} />
                        <a href={`mailto:${MAIL}`}>
                            <span>{MAIL}</span>
                        </a>
                    </div>
                </div>
                <img src={Close}
                    className={Styles.Close}
                    onClick={() => onClose()} />
            </div>
        </div>
    )
};

export default MobilePanel;