import toast from 'react-hot-toast';
import {useTranslation} from "react-i18next";

export default function useErrorToast() {
  const {t} = useTranslation();

  return (message?: string) => {
    toast.success(message ?? t('app.error_toast'), {
      position: 'top-center',
      icon: '❌',
      style: {
        borderRadius: '10px',
        padding: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }
}

