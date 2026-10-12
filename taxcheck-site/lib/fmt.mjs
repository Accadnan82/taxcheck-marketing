export function fmtDate(lang, iso) {
  const d = new Date(iso + 'T00:00:00Z');
  const loc = lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB';
  return new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
}
export function fmtDay(lang, iso) {
  const d = new Date(iso + 'T00:00:00Z');
  const loc = lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB';
  return new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(d);
}
export const money = (n) => (n < 0 ? '−' : '') + Math.abs(Math.round(n)).toLocaleString('en-US');
