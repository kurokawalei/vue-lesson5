
     
      import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
      import pageinfo from './page.js';




       const app = createApp( {

        data(){
            
            return {
              
                apiUrl:'https://vue3-course-api.hexschool.io',
                apiPach:'kurokawa2021',
                prList:[],
                pagination:{},
                carData:{},
                productId:'',
                isloading:false,
    
            }
        },
        methods:{
    
          //  https://vue3-course-api.hexschool.io/v2/api/kurokawa2021/products/all
    
            getProductList( page = 1 ){   
                axios.get(`${this.apiUrl}/v2/api/${this.apiPach}/products/?page=${page}`)
                .then( (res) => {
    
                    this.prList = res.data.products;
                    this.pagination = res.data.pagination;
    
                    
                })
                .catch((er) => {
                    console.log(er);
                });
    
            },

            getCarsDataList(){

               // https://vue3-course-api.hexschool.io/v2/api/kurokawa2021/cart

                axios.get(`${this.apiUrl}/v2/api/${this.apiPach}/cart`)
                .then( (res) => {
                 
                   this.carData = res.data.data;
                   console.log( res );
                    
                    
                })
                .catch((er) => {
                    console.log(er);
                });


            },

            openProductModal(id){

                this.productId = id;
                this.$refs.productModal.opentheModalfn();


            },

            addToCar(id , qty = 1 ){
              
                    //https://vue3-course-api.hexschool.io/v2/api/kurokawa2021/cart

                    const data = {

                        product_id:id,
                        qty,

                    };

                    this.isloading = id;


                    axios.post(`${this.apiUrl}/v2/api/${this.apiPach}/cart` , {data})
                    .then( (res) => {
        
                    
                     this.getCarsDataList();
                     this.isloading = '';

                    })
                    .catch((er) => {
                        console.log(er);
                    });

            },

            upLoadItem(item){

              


                const data = {

                    product_id: item.id,
                    qty: item.qty
                };

                this.isloading = item.id;

              

                axios.put(`${this.apiUrl}/v2/api/${this.apiPach}/cart/${item.id}` , {data} )
                .then( (res) => {
                    console.log(res);
                    this.getCarsDataList();       
                    this.isloading = '';             
                })
                .catch((er) => {
                    console.log(er);
                });
                

            },


            removeItem(id){


                axios.delete(`${this.apiUrl}/v2/api/${this.apiPach}/cart/${id}`)
                .then( (res)=> {

                 

                  
                    alert(res.data.message);
                     this.getCarsDataList();

                })
                .catch((er)=> {
                    console.log(er);
                } )

               

            },

            claerAll(){

                //https://vue3-course-api.hexschool.io/v2/api/kurokawa2021/carts

                axios.delete(`${this.apiUrl}/v2/api/${this.apiPach}/carts`)
                .then( (res)=> {
                    console.log(res);
                    alert(res.data.message);
                    this.getCarsDataList();
                })
                .catch((er)=> {
                    console.log(er);
                } )


            }
    
    
        },
        components:{
    
            pageinfo
    
        },
        mounted(){
    
            this.getProductList();
            this.getCarsDataList();
    
        }
    
    
    
        });

        //元件

        app.component( 'product-modal' , {
            props:['id'],
            data(){
                return {
                    apiUrl:'https://vue3-course-api.hexschool.io',
                    apiPach:'kurokawa2021',
                    modal:'',
                    product:{},
                    qty:1

                }
            },
            watch:{

                //如果函式名稱id變動觸發

                id(){
                    this.getProduct();
                }

            },
          
            template:'#userProductModal',
            methods:{

                opentheModalfn(){
                    this.modal.show();                  
                },
                getProduct(){

                    axios.get(`${this.apiUrl}/v2/api/${this.apiPach}/product/${this.id}`)
                    .then( (res) => {
        
                        this.product = res.data.product;

                        console.log(this.product);
                       
                        
                    })
                    .catch((er) => {
                        console.log(er);
                    });

                },
                addToCar(){
                    this.$emit('add-car' , this.product.id , this.qty )
                }


            },
            mounted(){


                this.modal = new bootstrap.Modal(  this.$refs.modal  );

               

               
               
            }


        } );





     
        app.mount('#app');
    
    
    