'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';

interface AnimatedStatusButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  onClick: () => void | Promise<void>;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  className?: string;
}

export const AnimatedStatusButton: React.FC<AnimatedStatusButtonProps> = ({
  buttonColor,
  onClick,
  buttonTextColor,
  changeText,
  initialText,
  className,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleOnClick = useCallback(async () => {
    await onClick();
    setIsSubscribed(true);
  }, [onClick]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {isSubscribed ? (
          <motion.button
            className="relative flex h-9 w-40 items-center justify-center overflow-hidden rounded-md border border-pink-400 bg-transparent px-3"
            onClick={handleOnClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              key="action"
              className="relative text-sm"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              style={{ color: buttonColor }}
            >
              {changeText}
            </motion.span>
          </motion.button>
        ) : (
          <motion.button
            className="relative flex h-9 w-40 cursor-pointer items-center justify-center rounded-md border-none px-3"
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
            onClick={handleOnClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              key="reaction"
              className="relative text-sm"
              initial={{ x: 0 }}
              exit={{ x: 50, transition: { duration: 0.1 } }}
            >
              {initialText}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
