const { createApp } = Vue

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'sponge';

createApp({
    data(){
        return{
            products:[],
            tempProduct:{
                imageUrl: [], //多圖
            },
            productModal: null,
            delProductModal: null,
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
                alert(err.response.data.message);
            })
        },
        // 取得商品列表
        getProducts(){
            // products是為了有分頁
            axios.get(`${ apiUrl }/api/${ apiPath }/admin/products`)
            .then((res)=>{
                this.products = res.data.products;
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
                productModal.show();
            }else if (status === 'edit') {
                this.tempProduct = { ...product };
                //  如果不是一個空陣列，就新增一個空陣列
                if(!Array.isArray(this.tempProduct.imagesUrl)){
                    this.tempProduct.imagesUrl=[];
                }
                this.isNew = false;
                productModal.show();
            }else if(status === 'delete'){
                this.tempProduct = { ...product };
                delProductModal.show()
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
                productModal.hide();
                this.tempProduct={};
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        },
        deleteProduct(){
            axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`)
            .then((res)=>{
                delProductModal.hide();
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
        
        // modal實體化
        productModal = new bootstrap.Modal(document.getElementById
            ('productModal'),{
                keyboard: false,
                backdrop: 'static'
            });
        
        delProductModal = new bootstrap.Modal(document.getElementById
            ('delProductModal'),{
                keyboard: false,
                backdrop: 'static'
            })   
    }
}).mount('#app')