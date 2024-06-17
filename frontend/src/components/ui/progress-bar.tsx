import { motion } from 'framer-motion';

interface ProgressBar {
  progress: number,
}

const ProgressBar = ({ progress }: ProgressBar) => {
  return (
    <div className=" h-6 bg-gray-200 rounded-full">
      <motion.div
        className="h-full bg-green-500 rounded-full"
        id="progress"
        style={{ width: `${progress}%` }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: 2,
          ease: [0, 0.71, 0.2, 1.01]
        }}  
      > 
        {progress > 3 &&  (
          <div className='flex  justify-end pr-4'>
            <span className='text-base font-normal'>{progress}%</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export { ProgressBar };