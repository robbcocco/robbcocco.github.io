export interface FilmImage {
    src: string;
    alt: string;
}

export interface FilmStripProps {
    children: React.ReactNode;
    filmBrand?: string;
    index?: number;
    onClick?: () => void;
}

export interface ScrollingFilmProps {
    children: React.ReactNode;
    slideshow: FilmImage[];
    film_brand?: string;
    setSelectedImage: (image: string | null) => void;
}

export interface UseScrollAnimationReturn {
    mainContentRef: React.RefObject<HTMLDivElement>;
    sideContentRef: React.RefObject<HTMLDivElement>;
    mobileContentRef: React.RefObject<HTMLDivElement>;
    height: number;
    mobileHeight: number;
} 