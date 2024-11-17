import { useState, useEffect } from 'react';

interface UseResponsiveFactorProps {
    widthBreakpoint: number;
    heightBreakpoint: number;
    increaseRate: number;
    widthBasedPageOffset: number;
    widthBasedOffset: number;
    widthBasedFooterOffset: number;
    heightBasedPageOffset: number;
    heightBasedOffset: number;
    heightBasedFooterOffset: number;
}

export const useResponsiveFactor = (props: UseResponsiveFactorProps) => {
    const [responsiveValues, setResponsiveValues] = useState<[number, number, number]>([0, 0, 0]);
    const [key, setKey] = useState<number>(0);

    const updateResponsiveProperties = () => {
        const {
            widthBreakpoint,
            heightBreakpoint,
            widthBasedPageOffset,
            widthBasedOffset,
            widthBasedFooterOffset,
            heightBasedPageOffset,
            heightBasedOffset,
            heightBasedFooterOffset
        } = props;

        let pageOffset = 0;
        let offset = 0;
        let footerOffset = 0;

        if (window.innerWidth <= widthBreakpoint) {
            pageOffset = widthBasedPageOffset;
            offset = widthBasedOffset;
            footerOffset = widthBasedFooterOffset;
        }

        if (window.innerWidth <= widthBreakpoint && window.innerHeight <= heightBreakpoint) {
            pageOffset = heightBasedPageOffset;
            offset = heightBasedOffset;
            footerOffset = heightBasedFooterOffset;
        }

        setResponsiveValues([pageOffset, offset, footerOffset]);
        setKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        updateResponsiveProperties();
        window.addEventListener('resize', updateResponsiveProperties);
        return () => window.removeEventListener('resize', updateResponsiveProperties);
    }, [
        props.widthBreakpoint,
        props.heightBreakpoint,
        props.increaseRate,
        props.widthBasedPageOffset,
        props.widthBasedOffset,
        props.widthBasedFooterOffset,
        props.heightBasedPageOffset,
        props.heightBasedOffset,
        props.heightBasedFooterOffset
    ]);

    return [...responsiveValues, key];
};
