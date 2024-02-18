import {
    ReactElement,
    useState,
    useRef,
    useEffect,
    useCallback,
    MouseEvent,
    TouchEvent
} from 'react';
import {useEnv} from 'Componenets/EnviromentProvider';
import Styles from './Slider/styles.module.css'
import Arrow from 'Assets/imgs/photos/arrow.png';
import classNames from 'classnames';

interface IProps {
    className?: string;
    items: any[];
    photoContainerClass?: string
}

enum DIRECTIONS {
    left,
    right
}

export const Slider = ({className, items, photoContainerClass}: IProps): ReactElement => {
    const photoContainer = useRef<any>();
    const imgCount = items.length;
    const [currentImg, setCurrentImg] = useState(0);
    const {isTouch} = useEnv();

    useEffect(() => {
        const setScroll = () => {
            const container = photoContainer.current;
            container.scrollLeft = currentImg * container?.getBoundingClientRect().width;
        };

        setScroll();

        const resizeObserver = new ResizeObserver((entries, observer) => {
            const [slider] = entries;
            if (slider.contentRect.width) {
                setScroll();
            }
        });

        resizeObserver.observe(photoContainer.current);

        return () => resizeObserver.disconnect();

    }, [currentImg]);

    const onArrowClick = useCallback((direction: DIRECTIONS, e: MouseEvent) => {
        if (direction === DIRECTIONS.left && currentImg === 0) {
            return;
        }

        if (direction === DIRECTIONS.right && currentImg === imgCount - 1) {
            return;
        }

        if (direction === DIRECTIONS.left) {
            setCurrentImg(currentImg - 1);
        } else {
            setCurrentImg(currentImg + 1);
        }
    }, [currentImg]);

    const onTouchEnd = useCallback((e: TouchEvent) => {
        if (!isTouch) {
            return;
        }

        setTimeout(() => {
            const containerWidth = photoContainer.current?.getBoundingClientRect().width || 0;
            const scrollLeft = photoContainer.current.scrollLeft;

            // получим индекс картинки, которая уходит за левый край
            const currentImg = Math.floor(
                scrollLeft / containerWidth
            );

            // если currentImg проскроленна дальше середины (middle), то нужно ее проскролить до конца
            const middle = containerWidth * currentImg + (containerWidth / 2);

            // индекс картинки, которую нужно отображать
            const index = scrollLeft > middle ? currentImg + 1 : currentImg

            if (photoContainer.current instanceof HTMLDivElement) {
                photoContainer.current.scrollLeft = containerWidth * index;
                // только этой строки недостаточно, т.к. слайдер не вызывает изменения состояния
                // состояние менять не требуется, если индекс не сменился, но выровнять изображение надо
                setCurrentImg(index)
            }
        }, 500);
    }, []);

    return (
        <div className={classNames(Styles.Container, className)}>
            <img src={Arrow}
                className={classNames(Styles.Arrow)}
                onClick={e => onArrowClick(DIRECTIONS.left, e)} />
            
            <div className={classNames(Styles.PhotoContainer, photoContainerClass, { [Styles.Scroll]: isTouch })}
                onTouchEnd={(e: TouchEvent<HTMLDivElement>) => onTouchEnd(e)}
                ref={photoContainer}>
                {
                    items.map((photo, i) => (
                        <img key={i} className={Styles.Img} src={photo.getImg()} />
                    ))
                }
            </div>

            <img src={Arrow}
                className={classNames(Styles.Arrow, Styles.ArrowRight)}
                onClick={e => onArrowClick(DIRECTIONS.right, e)} />
        </div>
    )
};

export default Slider;
