import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Google_Tag from './google_tag';
export default function FolderContent(props){
    const [_foldername_,setFolderName] = useState(props.navigation.getParam('foldername_'))
    const [name,setName] = useState(props.navigation.getParam('name'))
    const [googlesearch,setGoogleSearch] = useState('')
    const [retrievegoogledata1,setRetrieveGoogleData1] = useState([])
    const [retrievegoogledata2,setRetrieveGoogleData2] = useState([])
    const [youtubesearch,setYoutubeSearch] = useState('')
    const [linkjoin,setLinkJoin] = useState([])
    const [djoin,setDJoin] = useState([])
    const [youtubeAPITitles,setyoutubeAPITitles] = useState([])
    const [youtubeAPILinks,setyoutubeAPILinks] = useState([])
    const [updated,setUpdated] = useState(0)
    const [stored_data_array,setStored_dataArray] = useState([])
    const [linkarray,setLinkaray] = useState([])
    const [ytlinkjoin,setytLinkJoin] = useState([])
    const [ytdjoin,setytDJoin] = useState([])
    console.log(_foldername_.data)

    const LoadData = () =>{
        
    } 

    return(
        <SafeAreaProvider>
            <div style={{display:'flex',marginTop:'20px',marginLeft:'40px'}}>

            <div style={{padding:'10px'}}>
                <button style={{backgroundColor:'#3275a6'}}onClick={async()=>{
                    let api = await fetch(`https://e-spark.herokuapp.com/load_data/${name}/${_foldername_.data}`)
                    api = await api.json()
                    console.log(api.data)
                     setStored_dataArray(api.data)
                    console.log(stored_data_array)

            }}>Stored data</button><br></br>
            <div>{
                stored_data_array.map((data,index)=>{
                    data['link'].split('').map((data,index)=>{
                        if(data=='_'){
                            linkarray[index]='/'
                        }
                        else{
                            linkarray[index]=data
                        }
                    })
                    console.log(linkarray.join(""))
                    return (
                        <div>
                        <Google_Tag bn={''}val={data['name']} link={linkarray.join("")}/>
                        <br></br>
                        <br></br>
                        </div>
                    )
                })



}</div>
            
            </div>
               
                
                <div style={{padding:'10px'}}><TextInput type='text' placeholder='Google_ search' style={{padding:15,marginLeft:100,borderWidth:2}} onChangeText={(e)=>(setGoogleSearch(e))}/>
                <button style={{backgroundColor:'#3275a6'}} onClick={async()=>{
let api = await fetch(`https://e-spark.herokuapp.com/get_google_content/${googlesearch}`)
api = await api.json()
console.log(api['names'],api.urls)
setRetrieveGoogleData1(api['names'])
setRetrieveGoogleData2(api['urls'])
console.log(retrievegoogledata1,retrievegoogledata2)
                    }}>search data</button>

                <br></br><br></br><div>
                {
                   retrievegoogledata1.map((data,index)=>{
                       return(
                           <Google_Tag bn={'save source'}val={data} link={retrievegoogledata2[index]} clickfunction={async()=>{
                            retrievegoogledata2[index].split('').map((data_)=>{
                                let linkjoin_ = []
                                let djoin_ = []
                                if(data_ == '/'){
                                    console.log('alert')
                                    data_ = '_'
                                }
                                linkjoin_.push(data_)

                            })
                            data.split('').map((_)=>{
                                if(_ == '/'){
                                    _ = "_"
                                    console.log('alert')
                                }
                                djoin_.push(_)

                            })
                        

                            
                            console.log(djoin.join(''),linkjoin.join(""))
                            let api = await fetch(`https://e-spark.herokuapp.com/add_google_content/${name}/${_foldername_.data}/${djoin_.join("")}/${linkjoin_.join("")}`)
                            api = await api.json()
                            console.log(api)
                           }}/>
                       )
                   })
                }
                </div>
                </div>



                <div style={{padding:'10px'}}><TextInput type='text' placeholder='Youtube search' style={{padding:15,marginLeft:100,borderWidth:2}} onChangeText={(e)=>(setYoutubeSearch(e))}/>
                <button style={{backgroundColor:'#3275a6'}} onClick={async()=>{
                setUpdated(updated+1)
                let api = await fetch(`https://e-spark.herokuapp.com/get_youtube_data/${youtubesearch}`)
                api = await api.json()
                setyoutubeAPITitles(api.titles)
                setyoutubeAPILinks(api.link)
                console.log(youtubeAPITitles,youtubeAPILinks)
                }}><Text>Submit data(Double click)</Text></button><br></br><br></br>
                <div id='youtubecol' style={{marginLeft:'109px'}}>
                {   
                    youtubeAPITitles.map((data,index)=>{
                        return(
                            <Google_Tag val={data}  bn={'save source'}link={youtubeAPILinks[index]}  
                            
                            clickfunction={async()=>{
                                youtubeAPILinks[index].split('').map((data_)=>{
                                    let ytlinkjoin_ = []
                                    let ytdjoin_ = []
                                    if(data_ == '/'){
                                        console.log('alert')
                                        data_ = '_'
                                    }
                                    ytlinkjoin_.push(data_)
    
                                })
                                data.split('').map((_)=>{
                                    if(_ == '/'){
                                        _ = "_"
                                         console.log('alert')
                                    }
                                    ytdjoin_.push(_)
    
                                })
                            
    
                                
                                console.log('link is '+ytlinkjoin.join("").split('=')[1])
                                let api = await fetch(`https://e-spark.herokuapp.com/add_youtube_content/${name}/${_foldername_.data}/${ytdjoin.join("")}/${ytlinkjoin_.join("").split('=')[1]}`)
                                api = await api.json()
                                console.log(api)
                               }}
                            />
                        )
                    })
                     
                }
            
            
                
                   
                
                </div></div>


               
            </div>
        </SafeAreaProvider>
    )
}
