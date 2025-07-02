import React from 'react';
import Banner from '../Components/Banner';
import OurServices from '../Components/OurServices';
import LogoMarquee from '../Components/LogoMarquee';
import KeyFeaturesSection from '../Components/KeyFeaturesSection';
import MarchantCard from '../Components/MarchantCard';
import HowItWorks from '../Components/HowItWorks';

const Home = () => {
    return (
        <div className='space-y-10'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <LogoMarquee></LogoMarquee>
            <KeyFeaturesSection></KeyFeaturesSection>
            <MarchantCard></MarchantCard>
        </div>
    );
};

export default Home;