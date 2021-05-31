import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { ChallengesContext } from './ChallengesContext';

let countdownTimeout = null;
const VINTE_E_CINCO_MIN_IN_SECONDS = (25 * 60);
const ONE_MINUTE_IN_MILESECONDS = 1000;

interface CountdownProviderProps {
    children: ReactNode;
}

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(VINTE_E_CINCO_MIN_IN_SECONDS)
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setTime(VINTE_E_CINCO_MIN_IN_SECONDS);
        setIsActive(false);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, ONE_MINUTE_IN_MILESECONDS);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );
}

