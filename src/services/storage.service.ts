import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get<T>(key: string): T | null {
    const value: string | null = localStorage.getItem(key);
    if (value === null) return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  getOrSet<T>(key: string, defaultValue: T): T {
    const existingValue = this.get<T>(key)
    if (existingValue !== null) {
      return existingValue;
    }

    this.set(key, defaultValue);
    return defaultValue;
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear()
  }

}
