
     
    //   import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
      
      import pageinfo from './page.js';


      Object.keys(VeeValidateRules).forEach(rule => {
        if (rule !== 'default') {
          VeeValidate.defineRule(rule, VeeValidateRules[rule]);
        }
      });

      VeeValidateI18n.loadLocaleFromURL('./zh_Tw.json');

        // Activate the locale
        VeeValidate.configure({
        generateMessage: VeeValidateI18n.localize('zh_TW'),
        validateOnInput: true, // 調整為輸入字元立即進行驗證
        });
    
  

       const app = Vue.createApp( {

        data(){
            
            return {
              
                apiUrl:'https://vue3-course-api.hexschool.io',
                apiPach:'kurokawa2021',
                prList:[],
                pagination:{},
                carData:{
                    carts:[]
                },
                productId:'',
                isloading:false,
                form: {
                    user: {
                      name: '',
                      email: '',
                      tel: '',
                      address: '',
                    },
                    message: '',
                  },
    
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
                   //console.log( res );

                   console.log(  this.carData.carts.length );
                    
                    
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
                     alert(res.data.message);   
                     this.getCarsDataList();
                     this.isloading = '';

                     this.$refs.productModal.closetheModalfn();

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

                this.isloading =  id;


                axios.delete(`${this.apiUrl}/v2/api/${this.apiPach}/cart/${id}`)
                .then( (res)=> {

                    alert(res.data.message);
                     this.getCarsDataList();
                      this.isloading = '';
                  
             

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


            },
            send(){

              
                const order =  this.form;


                axios.post(`${this.apiUrl}/v2/api/${this.apiPach}/order` , { data: order } )
                .then((res)=> {

               
                alert(res.data.message);

                //重置表單+購物車列表
               
               
                this.$refs.form.resetForm();
                this.getCarsDataList();


                })
                .catch( (er)=> {
                    alert(er.data.message);
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
                    isloading:false,
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
                closetheModalfn(){
                    this.modal.hide();                  
                },
                getProduct(){



                    axios.get(`${this.apiUrl}/v2/api/${this.apiPach}/product/${this.id}`)
                    .then( (res) => {
        
                        this.product = res.data.product;

                       // console.log(this.product);
                       
                        
                    })
                    .catch((er) => {
                        console.log(er);
                    });

                },
                addToCar(){
                    this.$emit('add-car' , this.product.id , this.qty );
                },
              
              
                


            },
            mounted(){


                this.modal = new bootstrap.Modal(  this.$refs.modal  );

               

               
               
            }


        } );


        app.component('VForm', VeeValidate.Form);
        app.component('VField', VeeValidate.Field);
        app.component('ErrorMessage', VeeValidate.ErrorMessage);


     
        app.mount('#app');
    
    
    