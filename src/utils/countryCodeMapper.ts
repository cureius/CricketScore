import {countryNameToISO} from './constants';

export function getISOCodeFromCountryName(countryName: string): string {
  return countryNameToISO[countryName] || '';
}
