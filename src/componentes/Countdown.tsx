import cx from 'classnames';
import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const VINTE_E_CINCO_MIN_IN_SECONDS = (0.6 * 60);
    const ONE_MINUTE_IN_MILESECONDS = 1000;

    const [time, setTime] = useState(VINTE_E_CINCO_MIN_IN_SECONDS)
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
            console.log('Fim do ciclo');
            setHasFinished(true);
            setIsActive(false)
        }
    }, [isActive, time]);

    return (
        <>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button
                    disabled
                    className={styles.startCycleButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button
                            type="button"
                            className={cx(styles.startCycleButton, styles.startCycleButtonActive)}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={styles.startCycleButton}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                        </button>
                    )}
                </>
            )}
        </>
    );
}