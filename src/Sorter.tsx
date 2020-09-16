
export function sort(array: any[], attribute: string, ascending: boolean){
    let copy = [...array];
    if(attribute == 'none'){
        return copy;
    }
    let direction = ascending ? 1 : -1;
    let comparer = (first: any, second: any) => compare(first, second, attribute) * direction;
    copy.sort(comparer);
    return copy;
}

function compare(first: any, second: any, attribute: string){
    let str1 = first[attribute];
    let str2 = second[attribute];
    return str1.localeCompare(str2);
}