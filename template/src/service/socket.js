
import Vue from 'vue'

let SOCKET = null,
    SocketEmitter = new Vue()

function connect () {
    SOCKET = new WebSocket(`wss://`)

    SOCKET.onopen = _handleOpen

    SOCKET.onclose = _handleClose

    SOCKET.onmessage = _handleMessage

    // 接收各模块发送socket消息事件
    SocketEmitter.$on('send', _handleSendMessage)

    return SOCKET
}

function _handleOpen () {
    console.log('socket opened')
}

function _handleClose () {
    console.log('socket closed')
}

function _handleMessage (ev) {
    console.log('receive message', ev)

    SocketEmitter.$emit('message', ev.data)
}

function _handleSendMessage (payload) {
    SOCKET.send(payload.data)
}


export {
    connect,
    SocketEmitter
}