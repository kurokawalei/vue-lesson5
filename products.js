
    
     
      import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
    
      import pageinfo from './page.js';

    const app = createApp( {

        data(){
            
            return {
              
                apiUrl:'https://vue3-course-api.hexschool.io',
                apiPach:'kurokawa2021',
                prList:[],
                pagination:{},
                carData:{}
    
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
                } )
    
            }
    
    
        },
        components:{
    
            pageinfo
    
        },
        mounted(){
    
            this.getProductList();
    
        }
    
    
    
        });



        app.component( 'productmodal' , {

            data(){
                return{
                    modal:'',
                }
            },
            template:'#userProductModal',
            methdos:{

                openModal(){
                   this.$emit( 'modal' );
                }

               

            },
            mounted(){


                this.modal = new bootstrap.Modal(  this.$refs.modal  );

               
            }


        } );





     
        app.mount('#app');
    
    
    