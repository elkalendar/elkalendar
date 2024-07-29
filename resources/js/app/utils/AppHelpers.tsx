export const getAppName = (slug: string) => {
  switch (slug) {
    case 'google_calendar':
      return 'تقويم Google';
    case 'zoom':
      return 'زووم';
    case 'google_meet':
      return 'مقابلات Google';
  }
}

export const getAppCategoryName = (category: string) => {
  switch (category) {
    case 'calendar':
      return 'التقويمات';
    case 'conference':
      return 'المؤتمرات والكونفرانس';
  }
}
