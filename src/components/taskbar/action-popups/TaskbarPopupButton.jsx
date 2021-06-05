import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import DisplayPopupIcon from './DisplayPopupIcon';
import { usePopper } from 'react-popper';
import { match } from '../../../util/match';
import SystemTrayMenu from './SystemTrayMenu';
import useClock from '../../../hooks/useClock';

const ClockMenu = () => {
    const dateTime = useClock();

    return (
        <div className="flex pt-4 px-6  w-[22.5rem] h-[32rem] text-gray-100">
            <div>
                <span className="block text-5xl font-light">
                    {dateTime.toLocaleString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })}
                </span>
                <span className="block mt-2 text-blue-300">
                    {dateTime.toLocaleString([], {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}
                </span>
            </div>
        </div>
    );
};

const TaskbarPopupButton = ({ tooltip = '', width, id, placement }) => {
    const [referenceElement, setReferenceElement] = useState();
    const [popperElement, setPopperElement] = useState();
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
    });
    return (
        <Popover as={Fragment}>
            {({ open }) => (
                <>
                    <Popover.Button
                        title={tooltip}
                        ref={setReferenceElement}
                        className={clsx(
                            'h-10 relative cursor-default transition duration-150 hover:bg-white hover:bg-opacity-[0.15] text-gray-100 focus:ring-2 focus:ring-inset focus:ring-gray-100 focus:outline-none',
                            { [width]: width },
                        )}
                    >
                        <DisplayPopupIcon id={id} />
                    </Popover.Button>

                    {open && (
                        <Transition
                            enter="transition duration-250 ease-out"
                            enterFrom=" opacity-0"
                            enterTo=" opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom=" opacity-100"
                            leaveTo=" opacity-0"
                        >
                            <Popover.Panel
                                ref={setPopperElement}
                                style={{
                                    ...styles.popper,
                                    background: 'rgba( 8, 8, 4, 0.70 )',
                                    boxShadow:
                                        '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                                    backdropFilter: 'blur(10.0px)',
                                    WebkitBackdropFilter: 'blur(10.0px)',
                                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                                }}
                                {...attributes.popper}
                                className="w-auto h-auto bg-white "
                            >
                                {match(id, {
                                    start() {
                                        return <SystemTrayMenu />;
                                    },
                                    search() {
                                        return <SystemTrayMenu />;
                                    },
                                    ['system-tray']() {
                                        return <SystemTrayMenu />;
                                    },
                                    clock() {
                                        return <ClockMenu />;
                                    },
                                })}
                            </Popover.Panel>
                        </Transition>
                    )}
                </>
            )}
        </Popover>
    );
};

export default TaskbarPopupButton;
