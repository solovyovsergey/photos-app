import React from 'react';
import cn from 'classnames';
import placeholder from '../placeholder.svg';
//import { PhotosType } from '../data/data';
import './Page.scss';
import Buttons from './Buttons';
import { ISelectedPhoto, IPhotosData } from '../reducers';
import { DOMAIN } from '../utils/sagas';

interface PageProps {
    selectedPhoto: ISelectedPhoto;
    photosData: IPhotosData;
    loadPhoto: (id: number) => void;
    loadPhotosId: () => void;
    loadTest: () => void;
    testData: {
        data: string;
        error: string;
        isFetching: boolean;
    };
}

export const Page: React.FC<PageProps> = props => {
    const { selectedPhoto, selectedPhoto: { photoData: photoData = null }, photosData, loadPhoto, loadPhotosId, testData, loadTest } = props;
    const [id, setId] = React.useState(photoData && photoData.id || null);

    React.useEffect(() => {
        loadPhotosId();
        loadPhoto(1);
        return () => console.log('unmount');
    }, []);

    const pagesClassName = cn('page');

    const createImg = (url: string, className?: string) => {
        return (
            <div className={className}>
                <img key={className} src={url} />
            </div>
        )
    }

    const handleClick = (id: number | null) => {
        setId(id);
        if (id != null) loadPhoto(id);
    }

    const renderContent = () => {
        if (selectedPhoto.error) {
            return (<p>{"Во время загрузки произошла ошибка." + selectedPhoto.error}</p>)
        }
        if (selectedPhoto.isFetching) {
            const imgUrl = placeholder;
            const className = 'page__placeholder';
            return createImg(imgUrl, cn(className));
        } else {
            const imgUrl = photoData && photoData.id
                ? (DOMAIN + "/" + photoData.path)
                : "";
            const className = 'page__content';
            return createImg(imgUrl, cn(className));
        }
    }

    const renderButtons = () => {
        if (photosData.error) {
            return (<p>{"Во время загрузки произошла ошибка." + selectedPhoto.error}</p>)
        }
        const currentId = id || (photoData ? photoData.id : null);

        return photosData.isFetching
            ? <p>{"Подождите, идет загрузка..."}</p>
            : (<Buttons
                array={photosData.arrayPhotos || []}
                currentId={currentId}
                handleClick={handleClick}
            ></Buttons>)
    }

    const testContent = testData.isFetching
        ? "loading..."
        : testData.data;

    const buttons = renderButtons();
    const content = renderContent();
    return (
        <div className={pagesClassName}>
            {content}
            <div>
                {/*<button onClick={loadTest} className='buttons__button'>Click</button>*/}
                <div>{testContent}</div>
            </div>
            {buttons}
        </div>
    )
}
