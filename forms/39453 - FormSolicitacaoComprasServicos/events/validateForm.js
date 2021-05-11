function validateForm(form){
	
	var activity = getValue('WKNumState');
	var inicioPadrao = 0;
	
	log.info("displayFields WKNumState "+activity);
	
	if (activity != inicioPadrao)  {

		var msg = "";
		var hasErros = false;
		
		if (form.getValue('filial') == ""){
			msg += "Filial tem preenchimento obrigatório.\n";
			var hasErros = true;
			}
		if (form.getValue('ccusto') == ""){
			msg += "Centro de custo tem preenchimento obrigatório. \n";
			var hasErros = true;
			}

		
		//Verificando se  intens foram incluídos
		var produtos = form.getChildrenIndexes("tbProdutos");
		if ( produtos.length == 0){
			msg += "Adicionar itens é obrigatório. \n";
			var hasErros = true;
			}
		// Verificando se os itens incluídos estão com quantidade
		if ( produtos.length > 0){
			for (var i = 0; i < produtos.length; i++) {
				var quantidade = (form.getValue("quantidade___" + produtos[i]));
				if (quantidade < 1) {
					msg += "A quantidade do item "+ produtos[i] +" tem preenchimento obrigatório. \n";
					var hasErros = true;
		        }
			}
		}
		// Verificando se os itens incluídos estão com valor sugerido
		if ( produtos.length > 0){
			for (var i = 0; i < produtos.length; i++) {
				var valorSugerido = (form.getValue("valorUnitario___" + produtos[i]));
				if (valorSugerido == "") {
					msg += "O valor da unitário do item "+ produtos[i] +" tem preenchimento obrigatório. \n";
					var hasErros = true;
		        }
			}
		}
		
		
		// Verificando a seleção dos itens incluídos
		if ( produtos.length > 0){
			for (var i = 0; i < produtos.length; i++) {
				var nomeitem = (form.getValue("nomeItem___" + produtos[i]));
				if (nomeitem == "") {
					msg += "O item "+ produtos[i] +" tem preenchimento obrigatório. \n";
					var hasErros = true;
		        }
			}
		}
		
		if (hasErros == true) {
			throw msg;
			}
	
	}
}	
