"use client"

import { FilmStrip } from "./film-strip";
import { Negative } from "../commons/negative";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { ScrollingFilmProps } from "./types";

export default function ScrollingFilm({
    children,
    slideshow,
    film_brand = "",
    setSelectedImage
}: ScrollingFilmProps) {
    const {
        mainContentRef,
        sideContentRef,
        mobileContentRef,
        height,
        mobileHeight,
    } = useScrollAnimation();

    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <div style={{ height: height ? `${height}px` : "auto" }} id="container" className="grid gap-2 lg:grid-cols-12">
                    {/* Main Content */}
                    <div ref={mainContentRef} id="content" className="h-min col-span-8 py-2">
                        {children}
                    </div>

                    {/* Side Content */}
                    <div ref={sideContentRef} className={`h-min col-span-4 bg-background`}>
                        <div className='grid'>
                            {slideshow.map((image, index) => (
                                <FilmStrip
                                    key={index}
                                    filmBrand={(index + 2) % 3 === 0 ? film_brand : undefined}
                                    index={index+1}
                                    onClick={() => setSelectedImage(image.src)}
                                >
                                    <Negative src={image.src} alt={image.alt} portrait={false} />
                                </FilmStrip>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="block lg:hidden">
                <div className={`h-min col-span-4 bg-background`}>
                    <FilmStrip filmBrand={film_brand}>
                        <div ref={mobileContentRef} id="content" className="h-min col-span-8 py-2">
                            {children}
                        </div>
                    </FilmStrip>
                </div>
            </div>
        </>
    );
}
