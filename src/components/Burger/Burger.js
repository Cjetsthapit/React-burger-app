import React from 'react';
import classes from './Burger.css'
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';
const burger=(props)=>{
    let transformedIngridients = Object.entries(props.ingridients).map((a)=>{
        return [...Array(a[1])].map((_,i)=>{
                        return <BurgerIngridient key={a[0] + i} type={a[0]} />;
                    }) 
    })
    .reduce((arr, el )=>{
            return arr.concat(el);
        },[]);

    
    // let transformedIngridients = Object.keys( props.ingridients )
    //     .map( igKey => {
    //         return [...Array(props.ingridients[igKey] )].map((_,i)=>{
    //             return <BurgerIngridient key={igKey + i} type={igKey} />;
    //         } );
    //     } )
    //     ;
    if (transformedIngridients.length === 0) {
        transformedIngridients = <p>Please start adding ingredients!</p>;
    }
    // let transformedIngridient=Object.keys(props.ingridients)
    // .map(igkey=>{
    //     return [...Array(props.ingridients[igkey])].map((_,i)=>{
    //         return <BurgerIngridient key={igkey + i} type={igkey}/>
    //     });
    // })
    // .reduce((arr, el )=>{
    //     return arr.concat(el);
    // },[]);
    // if (transformedIngridient.length === 0){
    //     transformedIngridient=<p>Please Start Adding Ingridients</p>
    // }
    // let transformedIngridient=Object.keys(props.ingridients).map((igKey)=>{
    //     return [...Array(props.ingridients[igKey])].map((_,i)=>{
    //         return <BurgerIngridient key={igKey + i} type={igKey}/>
    //     })
    // })
    // .reduce((arr,el)=>{
    //     return arr.concat(el)
    // },[])
    // console.log(transformedIngridients)
    return(
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top"/>
            {transformedIngridients}
            <BurgerIngridient type="bread-bottom"/>
        </div>
    );
}

export default burger;

