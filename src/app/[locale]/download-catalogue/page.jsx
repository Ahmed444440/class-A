import MainBackground from '@/components/MainBackground';
import { mediaData } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import initTranslations from '@/app/i18n';

export async function generateMetadata({ params }) {
    const { locale } = params;

    // return {
    //     title: locale === 'ar' ? 'فيديوهات عن | Class A' : locale === 'en' ? "Videos about | Class A" : '',
    //     description: locale === 'ar' ? 'فيديوهات عن | Class A' : locale === 'en' ? "Videos about | Class A" : '',
    //     other: {
    //         title: locale === 'ar' ? 'فيديوهات عن | Class A' : locale === 'en' ? "Videos about | Class A" : '',
    //     }
    // };
}

const download = async ({ params }) => {
    const { locale, slug } = params; 

    const i18nNamespaces = ["home"];
    const { t } = await initTranslations(locale, i18nNamespaces);

    // const Data = await fetchData(`api/single-category/${slug}`, locale);
    // const videoData = Data?.data.videos;
    // if (!videoData || videoData.length === 0) {
    //     return <p>No videos available</p>;
    // }

    return (
        <section>
            <MainBackground />
            <div className='px-5 lg:px-28 py-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    <h1>download-catalogue</h1>
                </div>
            </div>
        </section>
    );
};
export default download;   