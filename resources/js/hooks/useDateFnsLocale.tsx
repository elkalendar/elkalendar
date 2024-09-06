import useTypedPage from "@/hooks/useTypedPage";
import {ar, enUS} from 'date-fns/locale'

const Locales = {
  ar: ar,
  en: enUS,
}

export default function useDateFnsLocale() {
  const page = useTypedPage();
  const locale = page.props.locale;

  if (Object.keys(Locales).includes(locale)) {
    return Locales[locale];
  }

  return Locales['en'];
}
