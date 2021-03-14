$(document).ready(function(){
    $('#BotaoLeitura').click(function(){
        lerJson();
    })
    $('#BotaoInserir').click(function(){
        IncluirJson();
    })
    $('#BotaoConsultar').click(function(){
        ConsultarJson();
    })
    $('#BotaoExcluir').click(function(){
        ExcluirJson();
    })
    $('#BotaoAlterar').click(function(){
        AlterarJson();
    })
})


function lerJson(){
    
    let xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("GET","http://localhost:8081/TitulosAPagar");

    xmlhttp2.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let TitulosAPagar = JSON.parse(this.responseText);
            let tbody = document.getElementById("Resultados");
            tbody.innerHTML = "";

            for(let ny = 0; ny < TitulosAPagar.length; ny++){
                tbody.innerHTML += `<td scope ="row">${TitulosAPagar[ny].id}</td>`+
                `<td scope ="row">${TitulosAPagar[ny].Descricao}</td>`+
                `<td scope ="row">${formataData(TitulosAPagar[ny].Data)}</td>`+
                `<td scope ="row">${formataValorReais(TitulosAPagar[ny].Valor)}</td>` +
                `<td scope ="row">${TitulosAPagar[ny].Opcao}</td>`;
            }
        }
    }
    xmlhttp2.send();
}

function IncluirJson(){
    let Codigo =(<HTMLInputElement>document.getElementById('Codigo')).value;
    let Descricao =(<HTMLInputElement>document.getElementById('Descricao')).value;
    let Valor = parseFloat((<HTMLInputElement>document.getElementById('Valor')).value);
    let Data = (<HTMLInputElement>document.getElementById('Data')).value
    let Opcao = (<HTMLInputElement>document.getElementById('Opcao')).value;
    let tbody = document.getElementById("Resultados");


    tbody.innerHTML += `<td scope="row">${Codigo}` +
                       `<td scope="row">${Descricao}` + 
                       `<td scope="row">${formataData(Data)}` +
                       `<td scope="row">${formataValorReais(Valor)}` +
                       `<td scope="row">${Opcao}`;

    let Titulo = {
        id: Codigo,
        Data: Data,
        Descricao: Descricao,
        Valor: Valor,
        Opcao: Opcao
    };

    let json = JSON.stringify(Titulo);

    let xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8081/TitulosAPagar",true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
}


function ConsultarJson(){
    let xmlhttp2 = new XMLHttpRequest();
    let Codigo =(<HTMLInputElement>document.getElementById("Codigo")).value;
    xmlhttp2.open("GET","http://localhost:8081/TitulosAPagar/" + Codigo, true);
    xmlhttp2.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let TitulosAPagar = JSON.parse(this.responseText);
            let tbody = document.getElementById("Resultados");
            tbody.innerHTML = "";
            tbody.innerHTML = `<td scope = "row">${TitulosAPagar.id}</td>`+
                              `<td scope = "row">${TitulosAPagar.Descricao}</td>`+
                              `<td scope = "row">${formataData(TitulosAPagar.Data)}</td>`+
                              `<td scope = "row">${formataValorReais(TitulosAPagar.Valor)}</td>` +
                              `<td scope = "row">${TitulosAPagar.Opcao}</td>`;
        }
    }
    xmlhttp2.send();

}

function ExcluirJson(){
    let xmlhttp2 = new XMLHttpRequest();
    let Codigo =(<HTMLInputElement>document.getElementById("Codigo")).value;
    xmlhttp2.open("DELETE","http://localhost:8081/TitulosAPagar/" + Codigo, true);
    xmlhttp2.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            alert("Disciplina excluida com sucesso!");
        }
    }   
    xmlhttp2.send();
}

function AlterarJson(){
    let xmlhttp2 = new XMLHttpRequest();
    let Codigo =(<HTMLInputElement>document.getElementById("Codigo")).value;

    if (Codigo) {

        let Codigo =(<HTMLInputElement>document.getElementById('Codigo')).value;
        let Descricao =(<HTMLInputElement>document.getElementById('Descricao')).value;
        let Valor = parseFloat((<HTMLInputElement>document.getElementById('Valor')).value);
        let Data = (<HTMLInputElement>document.getElementById('Data')).value
        let Opcao = (<HTMLInputElement>document.getElementById('Opcao')).value;
        let tbody = document.getElementById("Resultados");


        tbody.innerHTML += `<td scope="row">${Codigo}` +
                       `<td scope="row">${Descricao}` + 
                       `<td scope="row">${formataData(Data)}` +
                       `<td scope="row">${formataValorReais(Valor)}` +
                       `<td scope="row">${Opcao}`;

        let Titulo = {
            id: Codigo,
            Data: Data,
            Descricao: Descricao,
            Valor: Valor,
            Opcao: Opcao
        };               

        let json = JSON.stringify(Titulo);

        let xhr = new XMLHttpRequest();
        xhr.open("PUT","http://localhost:8081/TitulosAPagar/"+ Codigo,true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.send(json);
    }
    xmlhttp2.send();
    
}


function formataData(str:string){
    return str.split("-").reverse().join("/");
}

function formataValorReais(valor:number){
    return valor.toLocaleString("pt-BR",{style: 'currency', currency: "BRL"});
}