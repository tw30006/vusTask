const { createApp } = Vue


import Pagination from "./components/Pagination.js";
import ProductModal from "./components/ProductModal.js";
import DeleteModal from "./components/DeleteModal.js";

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'sponge';

createApp({
    data(){
        return{
            products:[],
            tempProduct:{
                imageUrl: [], //多圖
            },
            pages:{}, //分頁
            isNew: false,
        }
    },
    methods:{
        // 登入後的身份驗證
        checkAdmin(){
            axios.post(`${ apiUrl }/api/user/check`)
            .then((res)=>{
                console.log(res)
                this.getProducts()
            })
            .catch((error)=>{
                alert(error.response.data.message);
            })
        },
        // 取得商品列表
        getProducts(page){
            // products是為了有分頁
            axios.get(`${ apiUrl }/api/${ apiPath }/admin/products?page=${page}`)
            .then((res)=>{
                this.products = res.data.products;
                console.log(res);
                this.pages = res.data.pagination;
            })
            .catch((error)=>{
                alert(error.res.data.message);
            })
        },
        openModal(status, product){
            // 判斷現在是哪一個狀態的按鈕
            if(status === 'new'){
                // 新增的話，打開會是一個空的
                this.tempProduct= {
                    imagesUrl:[],
                };
                this.isNew = true;
                this.$refs.pModal.openModal();
            }else if (status === 'edit') {
                this.tempProduct = { ...product };
                //  如果不是一個空陣列，就新增一個空陣列
                if(!Array.isArray(this.tempProduct.imagesUrl)){
                    this.tempProduct.imagesUrl=[];
                }
                this.isNew = false;
                this.$refs.pModal.openModal();
            }else if(status === 'delete'){
                this.tempProduct = { ...product };
                this.$refs.delModal.openDelModal();
            }
        },
        updateProduct(){
            // 新增
            let api = `${apiUrl}/api/${apiPath}/admin/product`;
            // 方法
            let method = 'post';

            // 更新
            if(!this.isNew){
                api = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
                method = 'put'
            }

            axios[method](api,{data:this.tempProduct})
            .then((res)=>{
                this.getProducts();
                this.$refs.pModal.closeModal();
                this.tempProduct={};
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        },
        deleteProduct(){
            axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`)
            .then((res)=>{
                this.$refs.delModal.closeDelModal();
                this.getProducts();
            })
        }
    },
    mounted(){
        // 遠端取出token
        const token=document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1",
        );
        axios.defaults.headers.common.Authorization = token;

        this.checkAdmin();
        
        
        
        
    },
    components:{
        Pagination,
        ProductModal,
        DeleteModal,
    }
}).mount('#app')