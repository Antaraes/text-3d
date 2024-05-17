'use client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '@/utils/motion';
import { Button } from '@/components/ui/button';
import ProductList from '@/components/ProductList';

export default function Home() {
  return (
    <main className="flex w-full justify-around items-center gap-80 min-h-screen overflow-y-hidden ">
      <AnimatePresence>
        <motion.section className="home " {...slideAnimation('left')}>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LETS <br className="xl:block hidden" /> DO IT
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and our brand-new 3D Model tool.{' '}
                <strong>Unleash your imagination</strong> and define your own
                style.
              </p>
              <Button>Lets Go</Button>
            </motion.div>
          </motion.div>
        </motion.section>
        <motion.section className=" ">
          <ProductList />
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
