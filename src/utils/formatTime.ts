import { format, getTime, formatDistanceToNow,isValid, addDays } from 'date-fns';

// ----------------------------------------------------------------------

export function fyyyymmdd(input?: number | string | Date, change?: number) {
    if (!input) {
        const today: string = fyyyymmdd(new Date());
        // console.log({today});
        return today;
    } else if (change) {
        if (!isValidDate(input)) return "Is not valid date";
        const  result: string = fyyyymmdd(addDays(new Date(input), change));
        return result;
    }

    let result;
    switch (typeof input) {
        case "number":
            result = addDays(new Date(), input);
            break;
        default: 
            if (!isValidDate(input)) return "Is not valid date";
            result = new Date(input);
    }
    // console.log({input, result});

    result = result.toLocaleString('en-US', {timeZone: "Asia/Kolkata"}).split(',')[0].split('/');
    return `${result[2]}-${result[0].padStart(2,"0")}-${result[1].padStart(2,"0")}`;
}

export function fddmmyy(date: number | string | Date) {
    // console.log({date});
    return date && isValidDate(date) ? format(new Date(date), 'dd-MM-yy') : "";
}

export function fddMMMyy(date: number | string | Date) {
  // console.log({date});
  return date ? format(new Date(date), 'dd MMM yy') : "";
}

export function fddMMM(date: number | string | Date) {
  return format(new Date(date), 'dd MMM');
}

// export function fddmmyyyy(inputDate: any) {
//   // if (!isValidDate(inputDate)) return inputDate;

//   const indianDate = new Date(inputDate);
//   let date, month, year;

//   date = new Date(indianDate).getDate();
//   month = new Date(indianDate).getMonth() + 1; // take care of the month's number here ⚠️
//   year = new Date(indianDate).getFullYear();
  
//   if (date < 10) date = '0' + `${date}`;
//   if (month < 10) month = '0' + `${month}`;

//   // console.log({inputDate, date, month, year});
//   return `${date}/${month}/${year}`;
// }

// export function fddmmyy(inputDate: any) {
//   // if (!isValidDate(inputDate)) return inputDate;

//   const indianDate = new Date(inputDate);
//   let date, month, year;

//   date = new Date(indianDate).getDate();
//   month = new Date(indianDate).getMonth() + 1; // take care of the month's number here ⚠️
//   year = (new Date(indianDate).getFullYear()) - 2000;
  
//   if (date < 10) date = '0' + `${date}`;
//   if (month < 10) month = '0' + `${month}`;

//   // console.log({inputDate, date, month, year});
//   return `${date}/${month}/${year}`;
// }

export function isValidDate(d:number | string | Date) {
  // console.log(d,isValid(d))
  return isValid(new Date(d)||d)
}


export function fddmmyyyy(date: number | string | Date) {
  if(isValidDate(date)){
    return format(new Date(date), 'dd-MM-yyyy');
  }else{
    return date;
  }
}

export function Difference_In_Days(firstDate:string|Date,secondDate:string|Date){
  if(isValidDate(firstDate) && isValidDate(secondDate)){
    return Math.floor((new Date(firstDate).getTime() - new Date(secondDate).getTime())/(1000 * 3600 * 24));
  }else{
    return 0
  }
}

export function fDateTime(date: number | string | Date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date: number | string | Date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: number | string | Date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: number | string | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function dateDiffInDays(from: string|Date, to: string|Date){
  const a = new Date(from)
  const b = new Date(to)
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

// export const sessionFyStartDate = () => {

//   const sessionOgCompany = sessionOgCompanyCache.getItem();

//   return `2023-04-01`;

// };




// export const sessionFyEndDate = () => {

//   const sessionOgCompany = sessionOgCompanyCache.getItem();

//   return `2024-03-31`;

// };