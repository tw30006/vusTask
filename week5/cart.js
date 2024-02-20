const { createApp } = Vue

import userProductModal from '../week5/userProductModal.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'sponge';

// 表單驗證的外部套件
Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});




const app = createApp({
    data(){
        return{
            products: [],
            tempProduct: {},
            carts: {},
            form:{
                user:{
                    name: '',
                    email:'',
                    tel: '',
                    address: ''
                },
                message: '',
            },
            
            status: {
                addCartLoading: '',
                cartQtyLoading: '',
            }
        }
    },
    methods:{
        // 取得產品列表
        getProducts(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then((res)=>{
                this.products = res.data.products;
            })
        },
        openModal(product){
            this.tempProduct = product;
            this.$refs.userModal.open();
        },
        // 加入購物車，帶入參數預設值
        addToCart(product_id,qty = 1){
            const order = {
                product_id,
                qty
            };
            // 加入loading的效果
            this.status.addCartLoading = product_id;
            axios.post(`${apiUrl}/api/${apiPath}/cart`,{data: order})
            .then((res)=>{
                // 清掉loading
                this.status.addCartLoading = '';
                // 點擊加入購物車後，重新取得購物車的數量
                this.getCart();
                // 關閉modal
                this.$refs.userModal.close();
            })
        },
        // 更改數量的值
        changeCartQty(item,qty = 1){
            const order = {
                product_id : item.product_id,
                qty
            };
            // 避免數量重複觸發，給予loading的效果
            this.status.cartQtyLoading = item.id;
            axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`,{data: order})
            .then((res)=>{
                this.status.cartQtyLoading = '';
                this.getCart();
            })
        },
        // 取得購物車
        getCart(){
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
            .then((res)=>{
                this.carts = res.data.data;
                console.log(this.carts);
            })
        },
        // 刪除單一品項的購物車
        deleteCartItem(id){
            this.status.cartQtyLoading = id;
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
            .then((res)=>{
                this.status.cartQtyLoading = '';
                this.getCart();
            })
        },
        createOrder(){
            const order = this.form;
            console.log(order);
            axios.post(`${apiUrl}/api/${apiPath}/order`,{data: order})
            .then((res)=>{
                this.$refs.form.resetForm();
                this.getCart();
            })
        }
    },
    components:{
        userProductModal,
    },
    mounted(){
        this.getProducts();
        this.getCart();
    }
})

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);


app.mount('#app')