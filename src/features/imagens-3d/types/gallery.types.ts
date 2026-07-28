export type GalleryItemLayout = 'small' | 'wide' | 'tall' | 'large';

export type GalleryVariant = 'horizontal' | 'vertical' | 'square' | 'featured';

export type GalleryItem = {
  id: string;
  title: string;
  image: string;
  variant?: GalleryVariant;
};

export type GallerySectionType = {
  /** Chave da seção no namespace Images3DPage.sections. */
  id: string;
  items: GalleryItem[];
};
