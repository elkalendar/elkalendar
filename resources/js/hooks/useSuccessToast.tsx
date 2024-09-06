import toast from 'react-hot-toast';
import {getRandomSuccessEmoji} from '@/utils/EmojiHelpers';
import {useTranslation} from "react-i18next";

export default function useSuccessToast() {
  const {t} = useTranslation();

  return (message?: string) => {
    toast.success(message ?? t('app.success_toast'), {
      position: 'top-center',
      icon: getRandomSuccessEmoji(),
      style: {
        borderRadius: '10px',
        padding: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }
}

