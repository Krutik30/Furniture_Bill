  import numeral from "numeral";
  import { stateCode } from "../config";
  
  
  
  // ----------------------------------------------------------------------
  
  export function fCurrency(number:number) {
    return numeral(number).format(Number.isInteger(number) ? "0,0" : "0.00");
  }
  
  export function formatGstStateCode(gst:string){
    if(gst){
      const tempGst = gst?.slice(0,2);
      // @ts-ignore
      return `${tempGst}-${stateCode[tempGst]}`
    }else{
      return ""
    }
  }
  
  export function statusFormat(status:string){
    switch (status) {
      case "Active":
        return "active"
        break;
      
      case "Draft":
        return "draft"
        break;
      
      case "05deleted":
        return "deleted"
        break;
      default:
        return ""
        break;
    }
  }
  
  export function fPercent(number:number) {
    return numeral(number / 100).format("0.0%");
  }
  
  export function fIndianFormat(input:number | string, decimals?: number) {
    
    switch (typeof input) {
      // @ts-ignore
      case 'string':
        input = Number(input || 0);
        // convert string to number & then let it pass into number case.
        // break;
      case 'number':
        return input?.toLocaleString('en-IN', {
          minimumFractionDigits: decimals !== undefined ? decimals : 2,
        });
      default:
        return input;
    }
  }
  
  export function fIndianAmount(input: string|number, decimals?: number) {
  
    // limit number to 2 decimals.
    input = fNumber2decimals(input);
  
    // let newNumber = input.toString().split('.');
    // const numberOfCommas = Math.floor(newNumber[0].length / 2) - 1
  
    // for (let i=0; i < numberOfCommas ; i++) {
  
    // }
  
    const output = input.toLocaleString('en-IN', {
        maximumFractionDigits: ((decimals=== 0 || decimals) ? decimals : 2),
        // style: 'currency',
        // currency: 'INR'
    });
    // console.log({input, output});
    return output;
  
  }
  
  export function fNumber(number:number) {
    return numeral(number).format();
  }
  
  // converts a string or float number to 2 decimals.
  export function fNumber2decimals(number: string | number) {
    return Number(Number(number || 0).toFixed(2) || 0.00);
  }
  
  export function fShortenNumber(num:number, decimals: number = 2) {
    if(num>=10000000){
      num = num / 10000000;
      return `${num.toFixed(decimals)} Cr`;
    }else if(num>=100000){
      num = num /100000;
      return `${num.toFixed(decimals)} L`;
    }else if(num>=1000){
      num = num /1000;
      return `${num.toFixed(decimals)} K`;
    }else if(num>=0){
      return num.toFixed(decimals);
    }else{
      return 0;
    }
  }
  
  export function fData(number:number) {
    return numeral(number).format("0.0 b");
  }
  
  export function DrCrFormat(amount:string){
    const tempNum = parseInt(amount);
    return tempNum<0? `${fCurrency(Math.abs(tempNum))} Cr`:tempNum>0? `${fCurrency(Math.abs(tempNum))} Dr` : tempNum;
  }
  
  
  export function inWords(value:number) {
    const fraction = Math.round(frac(value)*100);
    let f_text  = "";
  
    if(fraction > 0) {
        f_text = "AND "+convert_number(fraction)+" PAISE";
    }
  
    return convert_number(value)+" RUPEES "+f_text+" ONLY";
  }
  
  function frac(f:number) {
    return f % 1;
  }
  
  function convert_number(number:number)
  {
    if ((number < 0) || (number > 999999999)) 
    { 
        return "NUMBER OUT OF RANGE!";
    }
    const Gn = Math.floor(number / 10000000);  /* Crore */ 
    number -= Gn * 10000000; 
    const kn = Math.floor(number / 100000);     /* lakhs */ 
    number -= kn * 100000; 
    const Hn = Math.floor(number / 1000);      /* thousand */ 
    number -= Hn * 1000; 
    const Dn = Math.floor(number / 100);       /* Tens (deca) */ 
    number = number % 100;               /* Ones */ 
    const tn= Math.floor(number / 10); 
    const one=Math.floor(number % 10); 
    let res = ""; 
  
    if (Gn>0){ 
      res += (convert_number(Gn) + " CRORE"); 
    } 
    if (kn>0) { 
      res += (((res=="") ? "" : " ") + 
      convert_number(kn) + " LAKH"); 
    } 
    if (Hn>0){ 
      res += (((res=="") ? "" : " ") +
      convert_number(Hn) + " THOUSAND"); 
    } 
  
    if (Dn) { 
      res += (((res=="") ? "" : " ") + 
      convert_number(Dn) + " HUNDRED"); 
    } 
  
  
    const ones = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX","SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN","FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN","NINETEEN"]; 
    const tens = ["", "", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY","SEVENTY", "EIGHTY", "NINETY"]; 
  
    if (tn>0 || one>0) { 
        if (!(res=="")) res += " AND "; 
    
  
        if (tn < 2) { 
            res += ones[tn * 10 + one]; 
        } else { 
  
            res += tens[tn];
            if (one>0) res += ("-" + ones[one]); 
        } 
    }
  
    if (res=="") res = "zero"; 
  
    return res;
  }
  
  
  
  