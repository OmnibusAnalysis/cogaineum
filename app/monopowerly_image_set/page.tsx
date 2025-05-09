'use client';

import Image from 'next/image';

export default function MonopowerlyImageSet() {
  const images = [
    { src: '/monopowerly_image_set/Board_print_image.jpg', alt: 'Board Print' },
    { src: '/monopowerly_image_set/Brand_print_image1.jpg', alt: 'Brand Print' },
    { src: '/monopowerly_image_set/Cards_print_image.jpg', alt: 'Cards Print' },
    { src: '/monopowerly_image_set/Cards_print_image2.jpg', alt: 'Cards Print 2' },
    { src: '/monopowerly_image_set/Cards_print_image3.jpg', alt: 'Cards Print 3' },
    { src: '/monopowerly_image_set/Cards_print_image4.jpg', alt: 'Cards Print 4' },
    { src: '/monopowerly_image_set/Cards_print_image_reverse_PR.jpg', alt: 'Cards Print Reverse PR' },
    { src: '/monopowerly_image_set/Cards_print_image_reverse_RMF.jpg', alt: 'Cards Print Reverse RMF' },
    { src: '/monopowerly_image_set/Industries_print_image1.jpg', alt: 'Industries Print 1' },
    { src: '/monopowerly_image_set/Industries_print_image2.jpg', alt: 'Industries Print 2' },
    { src: '/monopowerly_image_set/Industries_print_image3.jpg', alt: 'Industries Print 3' },
    { src: '/monopowerly_image_set/Industries_print_image4.jpg', alt: 'Industries Print 4' },
    { src: '/monopowerly_image_set/Industries_print_image5.jpg', alt: 'Industries Print 5' },
    { src: '/monopowerly_image_set/Money_print_image_1.jpg', alt: 'Money Print $1' },
    { src: '/monopowerly_image_set/Money_print_image_5.jpg', alt: 'Money Print $5' },
    { src: '/monopowerly_image_set/Money_print_image_10.jpg', alt: 'Money Print $10' },
    { src: '/monopowerly_image_set/Money_print_image_20.jpg', alt: 'Money Print $20' },
    { src: '/monopowerly_image_set/Money_print_image_50.jpg', alt: 'Money Print $50' },
    { src: '/monopowerly_image_set/Money_print_image_100.jpg', alt: 'Money Print $100' },
    { src: '/monopowerly_image_set/Money_print_image_500.jpg', alt: 'Money Print $500' },
  ];

  return (
    <div className="min-h-screen bg-black px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Monopowerly Image Set
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {images.map((image, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-900 to-pink-800 p-4 rounded-lg transition-transform hover:scale-102"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain rounded"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    inset: 0,
                    objectFit: 'contain',
                    color: 'transparent'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="/monopowerly_image_set/monopowerly_image_set.zip"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            Download All Images
          </a>
        </div>
      </div>
    </div>
  );
} 