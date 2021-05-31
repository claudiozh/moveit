import React from "react";
import { CompletedChallenges } from "../componentes/CompletedChallenges";
import { Countdown } from "../componentes/Countdown";
import { ExperienceBar } from "../componentes/ExperienceBar";
import { Profile } from "../componentes/Profile";
import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Inicio | moveit</title>
            </Head>

            <ExperienceBar />

            <section>
                <div>
                    <Profile />
                    <CompletedChallenges />
                    <Countdown />
                </div>

                <div>

                </div>
            </section>
        </div>
    )
}
