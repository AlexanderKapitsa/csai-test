class Paginate {
  static PAGE_SIZE = 5;
  #page = 0;
  #data;

  constructor(data) {
    this.#data = data;
  }

  next() {
    this.#page += 1;
    return this.getPage(this.#page);
  }

  getPage(page) {
    return this.#data.slice(
      Paginate.PAGE_SIZE * (page - 1),
      Paginate.PAGE_SIZE * page
    );
  }

  getMaxPages() {
    return Math.ceil(this.#data.length / Paginate.PAGE_SIZE);
  }

  isEnd() {
    return this.#data[Paginate.PAGE_SIZE * this.#page] === undefined;
  }
}

export default Paginate;
