import { Injectable } from '@angular/core';
import { Search } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  localStorageKey: string = "SAVED_SEARCHES";
  searches: { key: string, search: Search }[] = [];
  constructor() { }

  saveSearch(search: Search, name: string) {
    const localStorageValue = localStorage.getItem(this.localStorageKey);
    const saveSearch = {
      key: name, search: search
    };
    if (localStorageValue) {
      this.searches = JSON.parse(localStorageValue);
    }
    this.searches.push(saveSearch);
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.searches));
  }

  getAllSavedSearches(): { key: string, search: Search }[] {
    const localStorageValue = localStorage.getItem(this.localStorageKey);
    if (localStorageValue) {
      this.searches = JSON.parse(localStorageValue);
    }
    return this.searches;
  }
}
