import React from 'react';
import {BsLayoutTextSidebarReverse, BsLink45Deg} from 'react-icons/bs';
import {Anchor, Image} from '@mantine/core';
import {TbMapDown, TbMapUp} from 'react-icons/tb';
import EventLocationTypes from '@/enums/EventLocationTypes';
import {EventLocation} from '@/types/entities';
import GoogleMeet from '@/assets/svg/google_meet.svg';
import ZoomIcon from '@/assets/svg/zoom-icon.svg';
import OutgoingCallIcon from '@/assets/svg/outgoing-call-icon.svg';
import IncomingCallIcon from '@/assets/svg/incoming-call-icon.svg';
import i18next from "i18next";

export const getEventLocationLabel = (type: string): string => {
  i18next.t('key');

  switch (type) {
    case EventLocationTypes.TEXT:
      return 'نص مخصص';
    case EventLocationTypes.GOOGLE_MEET:
      return 'مكالمة عن بعد من خلال Google مقابلات';
    case EventLocationTypes.ZOOM:
      return 'مكالمة عن بعد من خلال زووم Zoom';
    case EventLocationTypes.PHONE_OUTGOING:
      return 'مكالمة هاتفية: أنت ستتصل بالمستضيف';
    case EventLocationTypes.PHONE_INCOMING:
      return 'مكالمة هاتفية: المستضيف سيتصل بك';
    case EventLocationTypes.CUSTOM_LINK:
      return 'رابط';
    case EventLocationTypes.IN_PERSON_HOST:
      return 'مقابلة شخصية: في مكان المستضيف';
    case EventLocationTypes.IN_PERSON_GUEST:
      return 'مقابلة شخصية: في عنوان المدعو';
    case EventLocationTypes.MICROSOFT_TEAMS:
      return 'مايكروسوفت Teams';
    default:
      return 'مكان الحدث';
  }
};

export const getEventLocationDisplayValueForHost = (type: string, data?: any): string => {
  switch (type) {
    case EventLocationTypes.CUSTOM_LINK:
      return getEventLocationLabel(type);
    case EventLocationTypes.TEXT:
      return data?.text ?? getEventLocationLabel(type);
    case EventLocationTypes.IN_PERSON_GUEST:
    case EventLocationTypes.IN_PERSON_HOST:
      return data?.address ?? getEventLocationLabel(type);
    case EventLocationTypes.GOOGLE_MEET:
      return getEventLocationLabel(type);
    case EventLocationTypes.ZOOM:
      return data?.zoomMeetingLink ?? getEventLocationLabel(type);
    case EventLocationTypes.PHONE_OUTGOING:
      return data?.phone ?? getEventLocationLabel(type);
    case EventLocationTypes.PHONE_INCOMING:
      return data?.phone ?? getEventLocationLabel(type);
    default:
      return getEventLocationLabel(type);
  }
}

export const getEventLocationLabelPublic = (type: string, data?: any): string => {
  switch (type) {
    case EventLocationTypes.CUSTOM_LINK:
      return data?.linkTitle ?? getEventLocationLabel(type);
    case EventLocationTypes.TEXT:
      return data?.text ?? getEventLocationLabel(type);
    case EventLocationTypes.IN_PERSON_HOST:
      return data?.showOnBookingPage ? (data?.address ?? getEventLocationLabel(type)) : getEventLocationLabel(type);
    case EventLocationTypes.IN_PERSON_GUEST:
      return 'عنوانك';
    default:
      return getEventLocationLabel(type);
  }
};

export const getEventLocationForConfirmation = (type: string, data?: any) => {
  switch (type) {
    case EventLocationTypes.CUSTOM_LINK:
      return data.link ? <Anchor href={data.link}>{data.link}</Anchor> : getEventLocationLabel(type);
    case EventLocationTypes.TEXT:
      return data?.text ?? getEventLocationLabel(type);
    case EventLocationTypes.IN_PERSON_HOST:
      return data?.address ?? getEventLocationLabel(type);
    case EventLocationTypes.IN_PERSON_GUEST:
      return data?.address ?? getEventLocationLabel(type);
    case EventLocationTypes.GOOGLE_MEET:
      return <Anchor href={data.googleMeetLink}>{data.googleMeetLink}</Anchor>;
    case EventLocationTypes.ZOOM:
      return <Anchor href={data.zoomMeetingLink}>{data.zoomMeetingLink}</Anchor>;
    default:
      return getEventLocationLabel(type);
  }
};

export const getEventLocationDescription = (type: string, data?: any): string | null => {
  switch (type) {
    case EventLocationTypes.CUSTOM_LINK:
      return 'سيتم إرسال الرابط إلى بريدك الإلكتروني بعد اتمام الحجز';
    case EventLocationTypes.GOOGLE_MEET:
      return 'سيتم إرسال رابط Google Meet إلى بريدك الإلكتروني بعد اتمام الحجز';
    case EventLocationTypes.ZOOM:
      return 'سيتم إرسال رابط Zoom إلى بريدك الإلكتروني بعد اتمام الحجز';
    case EventLocationTypes.PHONE_OUTGOING:
      return 'سيتم إرسال رقم الهاتف إلى بريدك الإلكتروني بعد اتمام الحجز';
    case EventLocationTypes.IN_PERSON_HOST:
      return 'سيتم إرسال عنوان الموعد إلى بريدك الإلكتروني بعد اتمام الحجز';
    default:
      return null;
  }
};

export const getEventLocationIcon = (type: string) => {
  switch (type) {
    case EventLocationTypes.TEXT:
      return <BsLayoutTextSidebarReverse size={18}/>;
    case EventLocationTypes.GOOGLE_MEET:
      return <Image mah={22} maw={22} src={GoogleMeet}/>;
    case EventLocationTypes.ZOOM:
      return <Image mah={22} maw={22} src={ZoomIcon}/>;
    case EventLocationTypes.PHONE_OUTGOING:
      return <Image mah={22} maw={22} src={OutgoingCallIcon}/>;
    case EventLocationTypes.PHONE_INCOMING:
      return <Image mah={22} maw={22} src={IncomingCallIcon}/>;
    case EventLocationTypes.CUSTOM_LINK:
      return <BsLink45Deg size={18}/>;
    case EventLocationTypes.IN_PERSON_HOST:
      return <TbMapDown size={18}/>;
    case EventLocationTypes.IN_PERSON_GUEST:
      return <TbMapUp size={18}/>;
    default:
      return <BsLayoutTextSidebarReverse size={18}/>;
  }
};

export const getEventLocationTypeDisplayValue = (location: EventLocation): string => {
  switch (location.type) {
    case EventLocationTypes.CUSTOM_LINK:
      return location.data?.link ?? '';
    case EventLocationTypes.TEXT:
      return location.data?.text ?? '';
    case EventLocationTypes.IN_PERSON_HOST:
      return location.data?.address ?? '';
    case EventLocationTypes.IN_PERSON_GUEST:
      return 'سيتم توفير عنوان اللقاء من قبل المدعو اثناء الحجز';
    case EventLocationTypes.GOOGLE_MEET:
      return 'سيقوم الكالندر بإنشاء رابط مقابلة Google Meet تلقائياً وارفاقه بالحجز.';
    case EventLocationTypes.ZOOM:
      return 'سيقوم الكالندر بإنشاء رابط مقابلة زووم Zoom تلقائياً وارفاقه بالحجز.';
  }
};
