import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Array<string>, args: string[]): any {
    const sortField = args[0];
    const sortDirection = args[1];

    if (value.length === 0 || args[0] === '' || args[1] === '') {
      return value;
    }

    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    value.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    });
    return value;
  }
}
