'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Featured: FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 text-center">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Featured Works
      </motion.h2>
      <div className="relative flex flex-col md:flex-row items-center md:items-stretch gap-16 md:gap-0 text-center">
        {/* Immigration Policy Download */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex-1 flex flex-col items-center text-center space-y-8 z-10 md:pr-12"
        >
          <motion.h3
            className="text-3xl font-bold mb-14 text-center bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Immigration Policy Download
          </motion.h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Explore our analysis: <span className="font-medium">TikTok Immigration Puzzle! Is the USA comparatively full?</span>
          </p>
          <Link
            href="/beta_dataful.xlsx"
            download
            className="inline-block px-8 py-4 font-semibold rounded-lg text-lg shadow-lg hover:scale-105 active:scale-95 transform-gpu"
            style={{
              background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 50%, #8b5cf6 100%)',
              color: 'white',
              transition: 'background 0.4s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)')}
            onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 50%, #8b5cf6 100%)')}
          >
            Spreadsheet!
          </Link>
        </motion.div>
        {/* No Kings Day Photo */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 flex flex-col items-center space-y-6 md:-ml-24"
        >
          <div className="relative w-full h-80 md:h-[32rem] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/861faf1f-9548-4cdb-8db5-44a2e173fce3.webp"
              alt="No Kings Day"
              fill
              style={{ objectFit: 'contain' }}
              className="transition-transform duration-500 hover:scale-110 cursor-pointer"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h3 className="text-2xl font-semibold text-center">No Kings Day</h3>
          <p className="text-gray-700 dark:text-gray-300 text-center text-lg">A visual celebration of community and creativity.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;