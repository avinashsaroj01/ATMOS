const { useEffect } = require("react");
import io from "socket.io-client"

const ENDPOINT = "http://localhost:4001";
var socket , selectedChatCompare;

useEffect(()=>{
    socket = io(ENDPOINT);
},[])