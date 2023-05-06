import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'replace',
})
export class ReplacePipe implements PipeTransform {
    transform(value: string, originalString: string, replacedString: string) {
        console.log(replacedString);
        return value.replaceAll(originalString, replacedString);
    }
    
}