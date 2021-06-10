const url = 'https://vue3-course-api.hexschool.io'
const path = 'bistro'

export default {
  getUserProducts () {
    const api = `${url}/api/${path}/products`
    axios.get(api).then(res => {
      if (res.data.success) {
        this.products = res.data.products
      }
    }).catch(err => {
      console.log(err)
    })
  },
  getCarts () {
    const api = `${url}/api/${path}/cart`
    axios.get(api).then(res => {
      if (res.data.success) {
        this.cart = res.data.data
        this.final_total = res.data.data.final_total
        // console.log(res)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  addToCart (item, qty) {
    const api = `${url}/api/${path}/cart`
    const cart = {
      product_id: item.id,
      qty
    }
    axios.post(api, { data: cart }).then(res => {
      if (res.data.success) {
        this.detailData = {}
        this.detailData.qty = 1
        this.getCarts()
        this.closeModal(this.detailModal)
      } else {
        alert(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  updateUserCarts (id, qty) {
    const api = `${url}/api/${path}/cart/${id}`
    const cart = {
      product_id: id,
      qty
    }
    axios.put(api, { data: cart }).then(res => {
      if (res.data.success) {
        if (qty === 0) {
          this.deleteCartProduct(id)
        } else {
          this.getCarts()
        }
      } else {
        alert(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  deleteCartProduct (id) {
    const api = `${url}/api/${path}/cart/${id}`
    axios.delete(api).then(res => {
      // console.log(res.data.success)
      this.getCarts()
    }).catch(err => {
      console.log(err)
    })
  },
  deleteCart () {
    const api = `${url}/api/${path}/carts`
    axios.delete(api).then(res => {
      if (res.data.success) {
        alert('已清除購物車')
        this.getCarts()
        this.isCheckout = false
      } else {
        alert()
      }
    }).catch(err => {
      console.log(err)
    })
  },
  openProduct (id) {
    const api = `${url}/api/${path}/product/${id}`
    axios.get(api).then(res => {
      if (res.data.success) {
        this.detailData = res.data.product
        this.detailData.qty = 1
        this.detailData.origin_price = this.money(this.detailData.origin_price)
        this.detailData.price = this.money(this.detailData.price)
        this.detailModal.show()
      } else {
        alert(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  checkout () {
  }
}
