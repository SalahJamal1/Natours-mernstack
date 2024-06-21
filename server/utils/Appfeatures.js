class Appfeatures {
  constructor(query, querys) {
    this.query = query;
    this.querys = querys;
  }
  filter() {
    const query = { ...this.query };

    const exclude = ['page', 'limit', 'sort', 'field'];
    exclude.forEach((el) => delete query[el]);
    const query1 = JSON.parse(
      JSON.stringify(query).replace(/\blt|lte|gt|gte\b/g, (x) => `$${x}`),
    );
    this.querys = this.querys.find(query1);
    return this;
  }
  sort() {
    if (this.query.sort) {
      const sorts = JSON.parse(
        JSON.stringify(this.query.sort).split(',').join(' '),
      );
      this.querys.sort(sorts);
    }
    return this;
  }

  field() {
    if (this.query.field) {
      const fields = JSON.parse(
        JSON.stringify(this.query.field).split(',').join(' '),
      );
      this.querys.select(fields);
    }
    return this;
  }
  page() {
    const limit = this.query.limit * 1;
    const page = this.query.page * 1;

    const skip = (page - 1) * limit;
    this.querys.skip(skip).limit(limit);
    return this;
  }
}
exports.Appfeatures = Appfeatures;
