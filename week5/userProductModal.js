
export default{
    props:['tempProduct','addToCart'],
    template: `
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>{{ tempProduct.title }}</span>
                </h5>
                    <button type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                        </div>
                        <div class="col-sm-6">
                            <span class="badge bg-primary rounded-pill">{{  }}</span>
                            <p>商品描述：{{ tempProduct.description }}</p>
                            <p>商品內容：{{ tempProduct.content }}</p>
                            <div class="h5">{{  }} 元</div>
                            <del class="h6">原價 {{ tempProduct.origin_price}} 元</del>
                            <div class="h5">現在只要 {{ tempProduct.price }} 元</div>
                            <div>
                                <div class="input-group">
                                    <!-- <input type="number" class="form-control" min="1" v-model="qty"> -->
                                    <!-- 把input改成select,為了避免用戶自己輸入錯誤的字,用v-model雙向綁定qty的數量 -->
                                    <select name="" id="" class="form-select" v-model="qty">
                                        <!-- 透過v-for跑數字 -->
                                        <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
                                    </select>
                                    <button type="button" class="btn btn-primary" @click="addToCart(tempProduct.id, qty)">加入購物車</button>
                                </div>
                            </div>
                        </div>
                    <!-- col-sm-6 end -->
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    data(){
        return{
            userProductModal: null,
            qty: 1,
        }
    },
    methods:{
        open(){
            this.userProductModal.show();
        },
        close(){
            this.userProductModal.hide();
        }
    },
    mounted(){
        this.userProductModal = new bootstrap.Modal(this.$refs.modal),{
                keyboard: false,
                backdrop: 'static'
            };
        
    },
    watch:{
        tempProduct(){
            this.qty = 1;
        }
    }
}