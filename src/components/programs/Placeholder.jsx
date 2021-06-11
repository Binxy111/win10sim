/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { SquareIcon, UnderscoreIcon, XIcon } from '../icons';
import { handleStopProcess } from '../../stores/actions';

const Placeholder = ({ program }) => {
    const { id, title } = program;

    const dispatch = useDispatch();

    return (
        <div className={clsx('w-full h-full bg-gray-200')}>
            <div className="flex flex-col h-full border border-gray-500">
                <div
                    className={clsx(
                        'flex items-center border-gray-400 justify-between h-8 text-gray-900 bg-gray-100 ',
                        'drag-handle',
                    )}
                >
                    <span className="ml-4 text-xs text-gray-700 ">{title}</span>

                    <div className="h-full py-[1px] text-gray-500">
                        <button
                            type="button"
                            className="h-full px-4 transition duration-100 hover:bg-gray-200 focus:outline-none"
                        >
                            <UnderscoreIcon className="w-3 h-3" />
                        </button>
                        <button
                            type="button"
                            className="h-full px-4 transition duration-100 hover:bg-gray-200 focus:outline-none"
                        >
                            <SquareIcon className="w-3 h-3" />
                        </button>
                        <button
                            type="button"
                            className="h-full px-4 transition duration-100 hover:bg-gray-200 focus:outline-none"
                            onClick={() => handleStopProcess(dispatch, program)}
                        >
                            <XIcon className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center h-full ">
                    <img
                        className="object-contain w-[30%] h-[30%]"
                        src={`/assets/icons/${id}/256.png`}
                        alt={`${title} program icon`}
                    />
                    <span className="tracking-tight text-gray-700">
                        {title} coming soon
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Placeholder;
