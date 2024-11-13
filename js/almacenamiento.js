function recuperarDatoLocal() {		

    if (localStorage.getItem("records") !== undefined) {

        return localStorage.getItem("records");	
    } else {

        console.log("no hay lista");
    }    	
}

function almacenarDatoLocal() {

    localStorage.setItem("records", /* donde se almacena*/);		
}
