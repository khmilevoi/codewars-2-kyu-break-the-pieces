export class Identify {
  constructor(key, id) {
    Identify.identifiers[key] = Identify.identifiers[key] || 65;

    const currentId = String.fromCharCode(Identify.identifiers[key]++);
    const name = `${key}-${currentId}`;

    this._id = id || Symbol(name);
    this._key = currentId;
  }

  static _identifiers = {};

  static get identifiers() {
    return this._identifiers;
  }

  get key() {
    return this._key;
  }

  get id() {
    return this._id;
  }
}
