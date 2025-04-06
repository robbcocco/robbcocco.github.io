export interface JournalImage {
    src: string;
    alt: string;
}

export interface JournalPost {
    title: string;
    date: string;
    description: string;
    slug: string;
    images: JournalImage[];
} 