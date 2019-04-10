import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'enumsToValues'
})
export class EnumsToValuesPipe implements PipeTransform{
    transform(value, args: string[]) : any {
        let keys = [];
        for (var enumMember in value) {
            if(enumMember != "" ){
                keys.push({key: enumMember, value: value[enumMember]});
            }
        }
        return keys;
    }
}