import toast from 'react-hot-toast';
import {getRandomSuccessEmoji} from '@/utils/EmojiHelpers';

export const showSuccessToast = (message = 'تم حفظ التعديلات') => {
  setTimeout(() => {
    toast.success(message, {
      position: 'top-center',
      icon: getRandomSuccessEmoji(),
      style: {
        borderRadius: '10px',
        padding: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }, 500);
};

export const showErrorToast = (message = 'خطأ') => {
  setTimeout(() => {
    toast.success(message, {
      position: 'top-center',
      icon: '❌',
      style: {
        borderRadius: '10px',
        padding: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }, 500);
};
