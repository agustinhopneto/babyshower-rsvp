import defaultDayJs from 'dayjs';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

defaultDayJs.locale('pt-br');
defaultDayJs.extend(customParseFormat);
defaultDayJs.extend(utc);
defaultDayJs.extend(timezone);
defaultDayJs.extend(localizedFormat);
defaultDayJs.extend(localizedFormat);

export const dayjs = defaultDayJs;

export const TIMEZONE_TIME = '-0300';
export const TIMEZONE_NAME = 'America/Sao_Paulo';

export function buildDayJs(date: string, time: string) {
  return dayjs(`${date}T${time}${TIMEZONE_TIME}`);
}
