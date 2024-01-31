import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data(){
        return({
            user:{
                username: '',
                password: ''
            }
            
        })
    },
    methods:{
        login(){
            const apiUrl='https://vue3-course-api.hexschool.io/v2';
            const path='sponge'

            axios.post(`${apiUrl}/admin/signin`,this.user)
            .then((res)=>{
                const { token,expired }=res.data;
                document.cookie = `hexToken=${ token }; expires=${ new Date(expired) };`;
                window.location="productApi.html"
            })
            .catch((error)=>{
                Swal.fire("登入失敗，請重新輸入！");
            })
        }
    }
}).mount('#app')