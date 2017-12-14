var url_atual = window.location.href;
url_atual = url_atual.split(':')
url_atual = url_atual[1];
console.log(url_atual);
let socket = io(url_atual.substr(2)+':3001');
let room = localStorage.getItem("room");
		socket.on(room, function (data) {
			var chat = document.getElementById('chat');
			if(Array.isArray(data)){
				for (var i = 0; i < data.length; i++) {
					if (localStorage.getItem("id") == data[i].id) {
						chat.innerHTML += "<p><b>"+data[i].name+"</b> - "+data[i].text+"</p>";
					} else{
						chat.innerHTML += "<p class='red-text'><b>"+data[i].name+"</b> - "+data[i].text+"</p>";
					}
				}
			}else{
				if (localStorage.getItem("id") == data.id) {
					chat.innerHTML += "<p><b>"+data.name+"</b> - "+data.text+"</p>";
				} else{
					chat.innerHTML += "<p class='red-text'><b>"+data.name+"</b> - "+data.text+"</p>";
				}
			}
		});
			var enviar = function() {
			var msg = {
				text: document.getElementById('msg').value,
				id: localStorage.getItem("id"),
				room: room
			}
			socket.emit('toServer', msg);
			document.getElementById('msg').value = "";
		};
	if ($('#msg').length == 1) {
	$('#submit').addClass('disabled');
}

$(document).ready(()=>{
	$('#submit').addClass('disabled');
	$('#msg').focus();
	$('#msg').on('keyup', function(){
		if($(this).val().length > 0)
			$('#submit').removeClass('disabled');
	});	
})