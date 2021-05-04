import * as React from 'react';
import {Text,TouchableOpacity,View,StyleSheet,Image, Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class Scanner extends React.Component{
    constructor(){
        super();
        this.state={
            hasCamPermission:false,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermission= async(id)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
        hasCamPermission:status==='granted',
        buttonState:id,
        scanned:false
    })
}

getCam= async(id)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
}

    handleBarCodeScanner=async({data})=>{
    const {buttonState}=this.state;
    if(buttonState==='clicked'){
    this.setState({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
    })
    }
    }
    
    render(){
        const hasCamPermission=this.state.hasCamPermission;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        const scannedData = this.state.scannedData;

        if(buttonState!=='normal'&&hasCamPermission===true){
            return(
                <BarCodeScanner onBarCodeScanned={
                scanned?
                undefined:this.handleBarcodeScanned
                } style={StyleSheet.absoluteFillObject}></BarCodeScanner>
                
            );
        }else if(buttonState==='normal'&&hasCamPermission===false){
        return(
            <View style={{display:'flex'}}>
                <Image style={styles.imageStyle} source={require('../assets/barcode.jpg')}></Image>
                <Text onPress={()=>{this.getCam()}} style={styles.textStyle}>Request camera permission</Text>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.getCameraPermission()}}><Text>Scan qr code</Text></TouchableOpacity>
                
            </View>
        )
        }
    }
}
const styles = StyleSheet.create({
buttonStyle:{
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'lightblue',
    width:100,
    height:30,
    alignSelf:'center',
    marginTop:30,
},
imageStyle:{
    marginTop:10,
    alignSelf:'center',
    height:250,
},
textStyle:{
    marginTop:30,
    alignSelf:'center',
    textDecorationLine:'underline'
}
})