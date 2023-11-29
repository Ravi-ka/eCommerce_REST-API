export default class ProductModel{

    constructor(id, name, desc, price, imageUrl, category, sizes){
        this.id = id,
        this.name = name,
        this.desc = desc,
        this.price = price,
        this.imageUrl = imageUrl,
        this.category = category,
        this.sizes = sizes
    }

    static getAll(){
        return products;
    }

    static addProduct(newProduct){
        const id = products.length+1;
        const newEntry = {id,...newProduct}
        console.log(newEntry)
        const result = products.push(newEntry);
        return result;
    }

    static getById(id){
     const productFound = products.find(u=>u.id == id)
     return productFound;
    }

    static filter(minPrice, maxPrice, category){
      const result = products.filter((product)=>{
        return(
        (!minPrice || product.price >= minPrice)&&
        (!maxPrice || product.price <= maxPrice)&&
        (!category || product.category == category))
      })
      return result;
    }

}

export var products = [
    new ProductModel(
      1,
      'Product 1',
      'Atomic Book',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'cat11111'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Ikigai',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'cat22222',
      ['XL','XXL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Deep Work',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'cat33333',
      ['S','M']
    ),
  ]