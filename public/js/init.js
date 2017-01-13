let socket = io('http://192.241.189.200:3001/');
let room = localStorage.getItem("room");
		socket.on(room, function (data) {
			var chat = document.getElementById('chat');
			if(Array.isArray(data)){
				for (var i = 0; i < data.length; i++) {
					if (localStorage.getItem("id") == data[i].id) {
						chat.innerHTML += "<p><b>"+data[i].text+"</b> - "+data[i].name+"</p>";
					} else{
						chat.innerHTML += "<p class='red-text'><b>"+data[i].text+"</b> - "+data[i].name+"</p>";
					}
				}
			}else{
				if (localStorage.getItem("id") == data.id) {
					chat.innerHTML += "<p><b>"+data.text+"</b> - "+data.name+"</p>";
				} else{
					chat.innerHTML += "<p class='red-text'><b>"+data.text+"</b> - "+data.name+"</p>";
				}
			}
		});
			var enviar = function() {
			var msg = {
				text: document.getElementById('msg').value,
				id: localStorage.getItem("id"),
				room: room
			}
			//console.log(msg.room);
			socket.emit('toServer', msg);
			document.getElementById('msg').value = "";
		};
	if ($('#msg').length == 1) {
	$('#submit').addClass('disabled');
}
$(document).on('change', '#msg', (function(){
	if($('#msg').length > 0 ){
		$('#submit').removeClass('disabled');
	}
}));
