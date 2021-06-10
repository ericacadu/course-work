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
    this.spinItem = item.id
    axios.post(api, { data: cart }).then(res => {
      if (res.data.success) {
        this.detailData = {}
        this.detailData.qty = 1
        this.getCarts()
        this.closeModal(this.detailModal)
        this.spinItem = ''
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
      if (res.data.success) {
        this.getCarts()
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  clearCart () {
    const api = `${url}/api/${path}/carts`
    this.spinItem = true
    axios.delete(api).then(res => {
      if (res.data.success) {
        alert('已清除購物車')
        this.getCarts()
        this.$refs.form.resetForm()
        this.isCheckout = false
        this.spinItem = false
      } else {
        alert()
      }
      this.$refs.form.resetForm()
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
    const api = `${url}/api/${path}/order`
    const form = {
      user: {
        ...this.order
      },
      message: this.userMessage
    }
    this.spinItem = 'checkout'
    axios.post(api, { data: form }).then(res => {
      if (res.data.success) {
        this.getCarts()
        // 這裡應該要清除表單資料，但是再次執行結帳動作時，上次的資料內容沒有被清除
        this.$refs.form.resetForm()
        this.isCheckout = false
      } else {
        console.log(res)
      }
      alert(res.data.message)
      this.spinItem = ''
    }).catch(err => {
      console.log(err)
    })
  }
}
