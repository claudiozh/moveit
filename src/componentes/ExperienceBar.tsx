
import { useState } from 'react';
import styles  from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const [experience, setExperience] = useState(0);

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>

            <div>
                <div style={{ width: `${experience}%` }} />

                <span className={styles.currentExperience} style={{ left: `${experience}%` }}>
                    {experience} xp
                </span>
            </div>

            <span>600 xp</span>
        </header>
    )
}