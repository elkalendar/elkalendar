import {DateFnsFormat, DateTimeLibraries, DayjsFormat} from "@/enums/Time";
import dayjs from "dayjs";
import {format} from "date-fns";
import {DateFormatType, HourSystemFormat} from "@/enums/Other";
import {formatInTimeZone, fromZonedTime} from "date-fns-tz";
import {ar} from "date-fns/locale";

export const convertTimeslotToTime = (timeslot: string, timezone: string|null = null): Date => {
    const [hours, minutes] = timeslot.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));

    return date;
}

export const getUserTimeFormat = (
    userTimeFormat: string,
    datetimeLibrary = DateTimeLibraries.DATE_FNS,
    timeOnly = true,
  ) => {
  if (datetimeLibrary === DateTimeLibraries.DAYJS) {
    switch (userTimeFormat) {
      case '24':
        return timeOnly ? DayjsFormat.TIME24 : DayjsFormat.DATE_TIME24;
      default:
        return timeOnly ? DayjsFormat.TIME12 : DayjsFormat.DATE_TIME12;
    }
  } else if (datetimeLibrary === DateTimeLibraries.DATE_FNS) {
    switch (userTimeFormat) {
      case '24':
        return timeOnly ? DateFnsFormat.TIME24 : DateFnsFormat.DATE_TIME24;
      default:
        return timeOnly ? DateFnsFormat.TIME12 : DateFnsFormat.DATE_TIME12;
    }
  }
}

export const getAvailabilitySlotAsDatetime = (date: Date, slot: string): Date => {
  return dayjs(`${format(date, 'yyy-MM-dd')} ${slot}`).toDate();
}

export const getTimeFormat = (isTwentyFour: boolean) => {
  if (isTwentyFour) {
    return HourSystemFormat.TwentyFourHours;
  }

  return HourSystemFormat.TwelveHours;
}

export const formatTime = (time: Date, timezone: string, isTwentyFour: boolean = false) => {
  return formatInTimeZone(time, timezone, getTimeFormat(isTwentyFour), {
    locale: ar,
  })
}

export const convertTimeToUtc = (time: Date, timezone: string, slot: string) => {
  return fromZonedTime(getAvailabilitySlotAsDatetime(time, slot), timezone, {
    timeZone: timezone
  });
}

export const formatDate = (date: Date, timezone: string, formatType: DateFormatType = DateFormatType.simple) => {
  let format = 'dd MMMM yyyy';

  if (formatType === DateFormatType.long) {
    format = 'EEEE, d MMMM yyyy';
  }

  return formatInTimeZone(date, timezone, format, {
    locale: ar,
  })
}
