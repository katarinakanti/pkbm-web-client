import moment from "moment";

// @ts-ignore
// import QRCode from 'qrcode';
import { User } from "./api/model/table/User";

export const base_url = import.meta.env.VITE_API_URL ?? 'http://localhost:7000';

export interface LoaderData {
  user: User | null;
}

export namespace UserUtility {
  // export const User 
  export function getToken(): string {
    return localStorage.getItem('webtoken') as string;
  }

  export function getAuthHeader(): string {
    return `Bearer ${getToken()}`;
  }

  export function setToken(webtoken: string) {
    localStorage.setItem('webtoken', webtoken);
  }

  export function removeToken() {
    localStorage.removeItem('webtoken');
  }

  export function getUserType() {

  }

  export function redirectIfHasLogin(to: string = '/') {
    // console.log("redirect to /")
    if (getToken()) {
      window.location.href = to;
    }
  }

  export function redirectIfNotLogin(to: string = '/login') {
    // console.log("redirect to login")
    if (!getToken()) {
      window.location.href = to;
    }
  }
}

export function getNearestDayWeekday(weekday_number: number): Date {
  const today = moment();

  let nearestDate;
  if (today.isoWeekday() === weekday_number) {
    return today.clone().toDate();
  } else {
    nearestDate = today.clone().isoWeekday(weekday_number);
    if (nearestDate.isBefore(today)) {
      return nearestDate.add(7, "days").toDate();
    }
    return nearestDate.toDate();
  }
}

// export async function generateQRCodeDataURL(code: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const opts = {
//       errorCorrectionLevel: 'H',
//       type: 'image/jpeg',
//       quality: 1,
//       margin: 0,
//     }
//     QRCode.toDataURL(code, opts, function (err: any, url: string) {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(url);
//     });
//   });
// }

export function formatRp(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
}
