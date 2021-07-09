
function recarregazoom(filial, grupoItem , linha, codusuario){


	// Efetuando filtro na seleção de itens conforme a filial informada.
	var codFilial = filial;
	var grupo = grupoItem;
	var usuario = codusuario;

	//Preparação do filtro 
	var filterValues = "CODFILIAL," + codFilial+','+"GRUPOITEM,"+grupo+','+"CODUSUARIO,"+usuario;
	console.log("filterValues: "+filterValues );
	reloadZoomFilterValues('nomeItem___'+linha, filterValues );
}

	
function fnCustomDelete(oElement){
	// Funcao que libera a seleção de filial quando todos os itens são removidos
    fnWdkRemoveChild(oElement);
    if ($('#tbProdutos')[0].rows.length-2==0){
    	window["filial"].disable(false);
    	window["ccusto"].disable(false);
    	
    }
 }

		