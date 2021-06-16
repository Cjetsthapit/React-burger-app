import React, {Component} from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Hoc from '../../hoc/Hoc';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGRIDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};
class BurgerBuilder extends Component{
    state={
        ingridients:null,
        totalPrice:4,
        purchasable:false,
        purchasing: false,
        loading:false,
        error:false
    }
    componentDidMount(){
        axios.get('https://burger-af9ce-default-rtdb.firebaseio.com/ingridients.json')
        .then(response=>{
            this.setState({ingridients:response.data})
        })
        .catch(error =>{this.setState({error:true})});
    }
    updatePurchaseState(ingridients){
        const sum =Object.keys(ingridients)
        .map((igKey)=>{
            return ingridients[igKey];
        }).reduce((sum,el)=>{
            return sum+el
        },0);
        this.setState({purchasable: sum>0})
    }
    addIngridientHandler = ( type ) => {
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingridients: updatedIngridients } );
        this.updatePurchaseState(updatedIngridients);
    }
    
    removeIngridientHandler=(type)=>{
        let count=this.state.ingridients[type];
        if (count > 0){
            count--;
        }
        const updatedIngridients={...this.state.ingridients};
        updatedIngridients[type]=count;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const newPrice = this.state.totalPrice-priceDeduction;
        this.setState({
                     totalPrice:newPrice,
                     ingridients:updatedIngridients
                 });
        this.updatePurchaseState(updatedIngridients);
    }
    purchaseHandler=()=>{
        this.setState({
            purchasing:true
        })
    }
    purchaseCancelHandler=()=>{
        this.setState({
            purchasing:false
        })
    }
    purchaseContinueHandler=()=>{
        this.setState({loading:true})
        const order={
            ingridients: this.state.ingridients,
            price:this.state.totalPrice,
            customer:{
                name:'Max',
                address:{
                    street:'Test1',
                    zipCode:'90461'
                },
                email:'test@test.com'
            },
            deliveryMode:'fastest'
        }

        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({loading:false, purchasing:false})
        })
        .catch(error=>{
            this.setState({loading:false, purchasing:false})
        });
        //alert("Successful")
    } 
    render(){
        const disabledInfo = {
            ...this.state.ingridients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary=null;

           
        let burger=this.state.error ?<p>Ingridients cant be loaded</p> :<Spinner/>;
        if(this.state.ingridients){  
        burger=(<Hoc> <Burger ingridients={this.state.ingridients}/>
        <BuildControls
            ingridientAdded={this.addIngridientHandler}
            ingridientsRemoved={this.removeIngridientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={!this.state.purchasable}
            ordered={this.purchaseHandler}
        /></Hoc>);
        orderSummary=<OrderSummary 
        price={this.state.totalPrice} 
        ingridients={this.state.ingridients} 
        modalClosed={this.purchaseCancelHandler} 
        modalContinue={this.purchaseContinueHandler} />
        }
        if (this.state.loading){
            orderSummary=<Spinner/>
        } 
        return(
            <Hoc>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Hoc>
        );
    }
}
export default withErrorHandler(BurgerBuilder, axios);