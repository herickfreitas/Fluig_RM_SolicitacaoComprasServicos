function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigRM"; 
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    log.info("QUERY _RM_ITENS_COMPRA constraints: " + constraints);
    
    var processo = "";
    for (var i = 0; i < constraints.length; i++) {
        if (constraints[i].fieldName == 'CODFILIAL') {
            processo = constraints[i].initialValue;    
        }
    }

    var grupoItem = "";
    for (var i = 0; i < constraints.length; i++) {
        if (constraints[i].fieldName == 'GRUPOITEM') {
        	grupoItem = constraints[i].initialValue;    
        }
    }

    var codusuario = "";
    for (var i = 0; i < constraints.length; i++) {
        if (constraints[i].fieldName == 'CODUSUARIO') {
        	codusuario = constraints[i].initialValue;    
        }
    }
    
    
    if (grupoItem == "" && (codusuario == 'flaviaalves' || codusuario == 'camilaribas')) {
    	
    	var myQuery = "SELECT * FROM _Fluig_ITENS_COMPRA WHERE CODFILIAL = "+"'"+processo+"'";
    }
    
    
    else if (grupoItem == "" && (codusuario != 'flaviaalves' || codusuario != 'camilaribas')) {
    	
    	var myQuery = "SELECT * FROM _Fluig_ITENS_COMPRA WHERE CODIGOPRD NOT LIKE '05.%' AND CODFILIAL = "+"'"+processo+"'";
    }
    
    
    else {
    	grupoItem = grupoItem+"%";
    	var myQuery = "SELECT * FROM _Fluig_ITENS_COMPRA WHERE CODIGOPRD LIKE "+"'"+grupoItem+"'"+" AND CODFILIAL = "+"'"+processo+"'";
    }
	
    
	
    log.info("QUERY _RM_ITENS_COMPRA: " + myQuery);
    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ERRO==============> " + e.message);
    } finally {
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return newDataset;
}

/*
function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

}function onMobileSync(user) {

}
*/