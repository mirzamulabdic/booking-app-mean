import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poolPipe',
})
export class poolPipe implements PipeTransform {
  transform(value: any[], filterString: boolean, propName: string): any[] {
    const resultArray = [];

    if (value.length === 0 || filterString === false || propName === '') {
      return value;
    }
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
