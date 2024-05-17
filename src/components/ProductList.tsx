import useFetch from '@/hooks/useFetch';
import { getAllModels } from '@/services/api';
import Image from 'next/image';
import { FC, Key } from 'react';
import Spinner from './common/Spinner';
import { motion } from 'framer-motion';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface ProductListProps {}

export const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};
const ProductList: FC<ProductListProps> = () => {
  const { data, error, isLoading } = useFetch('room', getAllModels);
  if (error) {
    <div>{error.message}</div>;
  }
  console.log(data);
  if (isLoading) {
    <Spinner lg />;
  }
  return (
    <div className=" grid grid-cols-3 gap-3">
      {data &&
        data.map(
          (item: string | StaticImport, index: Key | null | undefined) => (
            <motion.div
              key={index}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              viewport={{
                once: true,
              }}
              className="cursor-pointer"
              custom={index}
            >
              <Image src={item} alt={`item${index}`} width={200} height={200} />
            </motion.div>
          )
        )}
    </div>
  );
};

export default ProductList;
