import React from 'react';
import { Carousel } from '@mantine/carousel';

function LatestNewsCard() {
  return (
    <Carousel
      loop
      height={200}
      withIndicators
    >
      <Carousel.Slide className="dark:bg-slate-700">
        <div className="py-4 px-12">
          <h3 className="text-lg">اضافة خيار الدولة لإعدادات المستخدم</h3>
          <p className="text-xs dark:text-slate-200">السبت 24 سبتمبر 2023</p>
          <br />
          <p className="text-sm">
            الان يمكنك اضافة خيار الدولة لإعدادات المستخدم
          </p>
        </div>
      </Carousel.Slide>
    </Carousel>
  );
}

export default LatestNewsCard;
