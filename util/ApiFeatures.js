class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};

        console.log(keyword);
  
      this.query = this.query.find({ ...keyword });
      return this;
    }

    filters(){
      const querycopy = { ...this.queryStr}

      const removeFilds = ['keyword', 'page']

      removeFilds.forEach((el) => querycopy[el])

      let output = "";
      let prop = "";

      // Filter For Price and Rating

      // for (let key in querycopy){
      //   console.log(key)
      //   if(!key.match(/\b(gt|gte|lt|lte)\b/g)){
      //     output[key] = querycopy[key]
      //   }else{
      //     prop = key.split("[")[0]
      //     console.log("prop", prop)

      //     const opretor = key.match(/\[(.*)\]/)[1]

      //     if(!output[prop]){
      //       output[prop] = {}
      //     }

      //     output[prop][`$${opretor}`] = querycopy[key]
      //   }
      // }

      // console.log("output", output)

      let queryStr = JSON.stringify( querycopy)
      queryStr =  queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

      console.log(queryStr)
      this.query = this.query.find(JSON.parse(queryStr))

      return this
    }
}

export default ApiFeatures