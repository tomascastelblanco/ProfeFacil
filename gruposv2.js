
class Alumno {
    constructor(nombre, rut, ica, notas_mat, notas_ing, notas_alib, mail){
        this.nombre = nombre;
		this.rut = rut;
		this.ica = ica;
		this.notas_mat = notas_mat;
		this.notas_ing = notas_ing;
		this.notas_alib = notas_alib;
		this.mail = mail;
    }
}

class Curso {
    constructor(sigla, nombre, alumnos = []){
        this.cursos = ["MAT", "ING", "ALIB"];
        this.curso_dict = {"MAT": "notas_mat", "ING": "notas_ing", "ALIB": "notas_alib"};
        this.sigla = sigla;
		this.nombre = nombre;
		this.alumnos = alumnos;
		this.grupos = [];
		this.tipo_curso = "";
	    this.cursos.forEach(i => {
            if(this.sigla.includes(i)){
                this.tipo_curso = this.curso_dict[i];
            }
        });		
    }

    formar_grupos(n_alumnos){
        var aux,notas,primero,suma_grupo,minimo,indice,alumno,promedio,suma;
        function getAttr(elm, attr) {
            if (elm.attr !== null) {
                return elm.attr;
            }
            else{
                return null;
            }
        }
        aux = [...this.alumnos];
        notas = this.alumnos.map(i =>{
           return getAttr(i,this.tipo_curso);
        })
		// notas =[ for (x of this.alumnos) getAttr(x, this.tipo_curso) ]
        promedio =  notas.reduce((total,num) => total+num) / notas.lenght;
		suma = promedio * n_alumnos;
		while (aux.lenght != 0){ 
			primero = aux.splice(Math.floor(Math.random() * aux.lenght-1),1);
			suma_grupo = getAttr(primero, this.tipo_curso);
			this.grupo.push(primero);
            for(var i = 0; i<n_alumnos - 1;i++)
            {
				if (aux.length == 0){
                    return grupos;
                }
					
				minimo = 1000
				indice = 0
				for (var j=0; j<aux.length;j++){
					if (Math.abs(suma - (getAttr(aux[j], this.tipo_curso) + suma_grupo)) <= minimo){
						minimo = Math.abs(suma - (getAttr(aux[j], this.tipo_curso) + suma_grupo))
                        indice = j
                    }
                }
				alumno = aux.splice(indice,1)
				grupo.push(alumno)
                suma_grupo += getAttr(alumno, this.tipo_curso)
            }    
            grupos.push(grupo)
        }
		this.grupos = grupos;
        return grupos;
    }

    imprimir_grupos(){
        function getAttr(elm, attr) {
            if (elm.attr !== null) {
                return elm.attr;
            }
            else{
                return null;
            }
        }
        var alumnos,notas,promedio;
		console.log("------------------------")
		console.log(`Curso ${this.sigla}`)
		for (var i=0;i<this.grupos.length;i++){
            // alumnos = [for (x of this.grupos[i]) x.nombre];
            alumnos=this.grupos[i].map(x => x.nombre);
            // notas =[getattr(x, this.tipo_curso) for x in this.grupos[i]]
            notas = this.grupos[i].map(x => {
                return getAttr(x,this.tipo_curso);
            })
			promedio = notas.reduc((total,num) => total+num) / notas.lenght;
            console.log(`Grupo ${i.toString()}: ${alumnos.toString()}. Promedio del grupo ${promedio.toString()}`);
        }
        console.log("------------------------");
    }
    lista_mails(){
        // return [[alumno.mail for alumno in grupo] for grupo in self.grupos]
        return this.grupos.map(grupo =>{
            grupo.map(alumno =>{
                return alumno.mail;
            })
        })
    }

    lista_nombres(){
        // return [[alumno.nombre for alumno in grupo] for grupo in self.grupos]
        return this.grupos.map(grupo =>{
            grupo.map(alumno =>{
                return alumno.nombore;
            })
        })
    }
}
var alumnos = [];
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "Alumnos.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var record_num = 6;  
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i=1;i<allTextLines.length;i++) {
        var entries = allTextLines[i].split(',');
        alumnos.push(new Alumno(entries[0], entries[1], parseFloat(entries[2].replace(',','.')), 
            parseFloat(entries[3].replace(',','.')), parseFloat(entries[4].replace(',','.')),
            parseFloat(entries[5].replace(',','.')), entries[6].replace(',','.')))
    }
}
            
var calculo = Curso("ING101", "MATEMATICA", alumnos) 
var grupos = calculo.formar_grupos(4)
calculo.imprimir_grupos() 
