
const temp: any = {};

export class WindowStorage
{
  public static find(key: string, defaultValue: any = null): any
  {
    if (!temp[key]) { temp[key] = this.get(key); }
    if (!temp[key]) { temp[key] = defaultValue; }
    return temp[key];
  }

  public static save(key: string, object: any)
  {
    const stringify = typeof object === 'object' || Array.isArray(object);
    if (stringify) { object = JSON.stringify(object); }
    window.localStorage.setItem(key, object);
  }

  private static get(key: string): any
  {
    let saved = window.localStorage.getItem(key);
    if (!saved) { return null; }
    const first = saved[0];
    if (first === '{' || first === '[') { return saved; }

    try
    { saved = JSON.parse(saved); }
    catch (error)
    { console.log(`Storage[${key}] is not JSON parsable`); }
    return saved;
  }

  public static delete(key: string) { window.localStorage.removeItem(key); }

  public static clear()
  {
    window.localStorage.clear();
    Object.keys(temp).forEach((key) => { delete temp[key]; });
  }
}

// console.log(WindowStorage.find('hello'));
// WindowStorage.save('hello', 'world');
// console.log(WindowStorage.find('hello'));
// WindowStorage.clear();
// console.log(WindowStorage.find('hello'));
