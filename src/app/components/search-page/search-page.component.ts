import { Component, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent implements PipeTransform{
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
        return items;
    }

    // This will search and match any option.value that contains the search term
    return items.filter(item => item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
}
}
