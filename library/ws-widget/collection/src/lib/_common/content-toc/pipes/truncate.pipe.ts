import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (!value) {
      return ''
    }
    const words = value.split(' ')
    const newWord = words.slice(0, limit).join(' ')
    return words.length > limit ? (`${newWord}...`) : value
  }
}
