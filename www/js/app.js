var i=0;
$('.collection')
    .on('click', '.collection-item', function(){

        var $badge = $('.badge', this);
        if ($badge.length === 0) {
            $badge = $('<span class="badge brown-text">0</span>')
                        .appendTo(this);
        }

        $badge.text(parseInt($badge.text()) + 1);
		
		var nomeProduto = this.firstChild.textContent;
		Materialize.toast(nomeProduto + ' adicionado', 700);
    })

$('.modal-trigger').leanModal();

$('#confirmar').on('click', function() {
    var texto = "";

    $('.badge').parent().each(function(){
        texto += this.firstChild.textContent + ': ';
        texto += this.lastChild.textContent + ', ';
    });

    $('#resumo').empty().text(texto);
})

$('.collection')
    .on('taphold', '.collection-item', function() {
		
		var $badge = $('.badge', this);
		if ($badge.length != 0) {
		$badge.remove();
		var nomeProduto = this.firstChild.textContent;
		Materialize.toast(nomeProduto + ' removido', 700);
        }
});
	
$('.acao-limpar').on('click', function() {
    $('#numero-mesa').val('');
    $('.badge').remove();
});

$.mobile.loading().hide();

$('.scan-qrcode').on('click', function(){
    cordova.plugins.barcodeScanner.scan(
       function (resultado) {
           if (resultado.text) {
               Materialize.toast('Mesa ' + resultado.text, 2000);
               $('#numero-mesa').val(resultado.text);
           }
       },
       function (error) {
           Materialize.toast('Erro: ' + error, 3000, 'red-text');
       }
    );
});

$('.acao-finalizar').on('click', function() {
    $.ajax({
        url: 'http://luiscrjr.esy.es/cozinhapp/index.php',
        data: {
            mesa: $('#numero-mesa').val(),
            pedido: $('#resumo').text()
        },
		success: function() {
			navigator.vibrate(2500);
            Materialize.toast('Pedido enviado com sucesso!', 2500);

            $('#numero-mesa').val('');
            $('.badge').remove();
        },
        error: function() {
			navigator.vibrate(2500);
            Materialize.toast('Erro ao realizar o pedido...', 2500);

            $('#numero-mesa').val('');
            $('.badge').remove();
        }
        
    });
});




