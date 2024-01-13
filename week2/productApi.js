import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
    data(){
        return{
            apiUrl:'https://vue3-course-api.hexschool.io/v2',
            path:'sponge',
            products:[],
            tempProduct:{}
        }
    },
    methods:{
        checkLogin(){
            const url=`${this.apiUrl}/api/user/check`;
            axios.post(url)
            .then((res) => {
                Swal.fire("驗證成功！");
                this.getProducts()
            })
            .catch((error)=>{
                alert(error.response.data.message);
                window.location="login.html";
            })
        },
        getProducts(){
            const url=`${this.apiUrl}/api/${this.path}/admin/products`;
            axios.get(url)
            .then((res) =>{
                this.products = res.data.products
            })
            .catch((error)=>{
                alert(error.response.data.message);
            })
        }
    },
    mounted(){
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1",
          );
        axios.defaults.headers.common.Authorization = token;
        this.checkLogin()
    }
})

app.mount('#app')