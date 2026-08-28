class Collection<T> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = items;
  }

  getAll(): T[] {
    return this.items;
  }

  getItem(index: number): T {
    return this.items[index];
  }

  clear() {
    this.items = [];
  }

  add(item: T) {
    this.items.push(item);
  }

  remove(item: T) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  replace(item: T, replacement: T) {
    this.items.splice(this.items.indexOf(item), 1, replacement);
  }
}

const nameCollection: Collection<string> = new Collection();
const numberCollection: Collection<number> = new Collection();
