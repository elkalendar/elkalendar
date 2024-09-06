import i18next from "i18next";

export default [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const getArabicWeekday = (weekday: string) => {
  i18next.t('key');

  switch (weekday) {
    case 'monday':
      return 'الاثنين';
    case 'tuesday':
      return 'الثلاثاء';
    case 'wednesday':
      return 'الأربعاء';
    case 'thursday':
      return 'الخميس';
    case 'friday':
      return 'الجمعة';
    case 'saturday':
      return 'السبت';
    case 'sunday':
      return 'الأحد';
    default:
      return '';
  }
}
