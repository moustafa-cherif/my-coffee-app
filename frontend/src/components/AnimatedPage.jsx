/*
  الغرض: مكون وسيط يضيف تأثيرات انتقالية (أنيميشن) بين الصفحات باستخدام framer-motion.
  يوفر حركات دخول وخروج سلسة (تلاشي مع انزلاق) عند التنقل بين Routes.
*/
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;