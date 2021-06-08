const url = 'https://vue3-course-api.hexschool.io'
const path = 'bistro'

export default {
  getUserProducts () {
    const api = `${url}/api/${path}/products`
    axios.get(api).then(res => {
      console.log(res)
      if (res.data.success) {
        this.products = res.data.products
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
