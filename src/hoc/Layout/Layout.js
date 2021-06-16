import React,{Component} from 'react';
import Hoc from '../Hoc';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        console.log("Closed");
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler=()=>{
        console.log("Opened");
        this.setState((prevState)=>{
        return{showSideDrawer:!prevState.showSideDrawer};
        
        });
    }
    render(){
        return(
            <Hoc>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Hoc>
        )
    }
}
   
    

export default Layout;