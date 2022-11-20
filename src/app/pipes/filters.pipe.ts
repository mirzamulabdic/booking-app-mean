import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters',
})
export class FiltersPipe implements PipeTransform {
  transform(value: any[], filterString: string[], propName: string): any[] {
    const resultArray = [];

    if (value.length === 0 || filterString == null || propName === '') {
      return value;
    }
    for (const item of value) {
      if (item[propName] == filterString[0]) {
        resultArray.push(item);
      } else if (item[propName] == filterString[1]) {
        resultArray.push(item);
      } else if (item[propName] == filterString[2]) {
        resultArray.push(item);
      } else if (item[propName] == filterString[0]) {
        if (item[propName] == filterString[1]) {
          resultArray.push(item);
        }
      }
    }
    return resultArray;
  }
}
