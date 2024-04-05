import React, { createContext, useState } from 'react';

interface Action {
    title: string;
    onPress?: () => void;
}

interface ActionsContextProps {
    actions: Action[];
    onOpen: () => void;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}

const ActionsContext = createContext<ActionsContextProps>({} as ActionsContextProps);

export const ActionsProvider = ({ children, ...props }: ActionsContextProps & { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
        setIsOpen(true);
        props.onOpen?.();
    };

    const onClose = () => {
        setIsOpen(false);
        props.onClose?.();
    };

    return (
        <ActionsContext.Provider value={{ isOpen, actions: props.actions, onOpen, onClose }}>
            {children}
        </ActionsContext.Provider>
    );
};

export default ActionsContext;
