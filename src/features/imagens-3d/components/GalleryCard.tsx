import Image from 'next/image';
import type { GalleryItemLayout } from '../types/gallery.types';

type GalleryCardProps = {
  title: string;
  image: string;
  layout?: GalleryItemLayout;
};

function getLayoutClasses(layout?: GalleryItemLayout) {
  switch (layout) {
    case 'wide':
      return 'col-span-12 md:col-span-6 xl:col-span-4 row-span-1 aspect-[1.7/1]';
    case 'tall':
      return 'col-span-12 md:col-span-6 xl:col-span-3 row-span-2 aspect-[0.9/1.3]';
    case 'large':
      return 'col-span-12 md:col-span-6 xl:col-span-6 row-span-2 aspect-[1.35/1]';
    case 'small':
    default:
      return 'col-span-12 md:col-span-6 xl:col-span-3 row-span-1 aspect-[1.45/1]';
  }
}

export default function GalleryCard({ title, image, layout = 'small' }: GalleryCardProps) {
  return (
    <article className={getLayoutClasses(layout)}>
      <div className="group relative h-full w-full overflow-hidden rounded-[6px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
    </article>
  );
}
