import React from 'react';
import './Buttons.scss';
import cn from 'classnames';
import { IArrayPhotos } from '../reducers';

interface ButtonsProps {
    array: IArrayPhotos[];
    currentId: number | null;
    handleClick: (id: number | null) => void;
}
const Buttons: React.FC<ButtonsProps> = props => {
    const { array, handleClick, currentId } = props;
    const btnsClassName = cn('buttons');
    const handler = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const id = e.currentTarget.dataset.value
            ?parseInt(e.currentTarget.dataset.value,10)
            :null;
            handleClick(id);
        },
        [handleClick]
    )

    const renderButtons = () => {
        return array.map((obj) => {
            const {id, name} = obj;
            const val = id === currentId;
            const btnClassName = cn('buttons__button', {
                'buttons__button--disabled': val,
            });
            return (
                <button
                    key={id}
                    data-value={id}
                    disabled={val}
                    className={btnClassName}
                    onClick={handler}
                >{name}</button>
            )
        })
    }

    return <div className={btnsClassName}>{renderButtons()}</div>
}

export default Buttons;
