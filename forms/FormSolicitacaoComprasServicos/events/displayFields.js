function displayFields(form,customHTML){
	
	var activity = getValue('WKNumState');
	var inicioPadrao = 0;
	var ajustarSolicitacao = 180;
	var inicioProcesso = 2;
	
	log.info("displayFields WKNumState "+activity);
	
	if ((activity != inicioPadrao) && (activity != ajustarSolicitacao)) {
		
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();

	    // Desabilitando o botão delete ou excluir e também o botao de inserir itens
	    form.setHideDeleteButton(true);
	    form.setVisibleById("btn_addProduto",false);
	    
	    
	    // Laço de repetição para habilitar/desabilitar os campos
	    while (it.hasNext()) { 
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
		
	}
	
	// Sugestão de filial e centro de custo para o solicitante
    if	(activity == inicioPadrao || activity == inicioProcesso){
    	
    	// capturar usuario corrente
    	var usuarioSolicitante = getDadosUsuario().getLogin();
    	form.setValue("solicitante",usuarioSolicitante);
    	
		// Formatando em minúsculo
		var codusuario = usuarioSolicitante.toLowerCase();
		log.info("==========[ displayFields codusuario ]=========="+codusuario);
		
		// Preparacao de filtro para consulta
		var filtro = DatasetFactory.createConstraint("CODUSUARIO", codusuario, codusuario, ConstraintType.MUST);
		var constraints = new Array(filtro);
		log.info("==========[ displayFields createDataset constraints ]========== " + constraints);
		
		// coleta dados do dataset, utlizando filtro
		var datasetReturned = DatasetFactory.getDataset("_RM_FUNC_FILIAL_CUSTO", null, constraints, null);
		log.info("==========[ displayFields createDataset datasetReturned ] ========== " + datasetReturned);	  
			    
		// Gravando valores de retorno
		var retorno = datasetReturned.values;
		log.info("==========[ displayFields createDataset dataset ]========== " + retorno);
			
		// Retirando o campo do resultado
		var filial = datasetReturned.getValue(0, "NOMEFILIAL");
		log.info("==========[ displayFields createDataset codfilial ]========== " + filial);

		// Retirando o campo do resultado
		var custo = datasetReturned.getValue(0, "CUSTO_NOME");
		log.info("==========[ displayFields createDataset codccusto ]========== " + custo);

		//Atribuindo os valores aos formulários
		form.setValue("filial",filial);
		form.setValue("ccusto",custo);

    }
}

function getDadosUsuario(){
    return fluigAPI.getUserService().getCurrent();
}

