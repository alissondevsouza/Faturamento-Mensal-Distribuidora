

let faturamentos = []
let maiorPreco = []
let menorPreco = []
let faturmaneotsSemzero = []
let somaMedia;
let teste = [2, 3, 4, 5, 5]
let diasMaior = []
let diasLucro = []
let totalDias 
let divisorMédia
let qtdDias = []

fetch("assets/dados.json").then((response) => {
    response.json().then((dadosJson) => {
        let faturamentosJson = dadosJson
        let i 


        for ( i = 0; i < Object.keys(faturamentosJson).length; i++ ){
            faturamentos[i] = faturamentosJson[i].valor
        }

        let faturamentoMaior = biggerValue(faturamentos)
        
        
        for (y=0; y <  Object.keys(faturamentos).length; y++){
            if( faturamentos[y] > 0){
                faturmaneotsSemzero[y] = faturamentos[y]
            }
        }
        let faturamentoMenor = smallValue(faturmaneotsSemzero)
        
        divisorMédia = Object.keys(faturmaneotsSemzero).length

        for ( z = 0; z < Object.keys(faturmaneotsSemzero).length; z++ ){
            if (faturamentoMenor == faturamentosJson[z].valor){
                menorPreco = faturamentosJson[z]
            }
        }
  
        for (x=0; x < Object.keys(faturamentosJson).length; x++){
            if (faturamentoMaior == faturamentosJson[x].valor){
                maiorPreco = faturamentosJson[x]
            }
        }

       
        let precoMaior = maiorPreco.valor
        let precoMaiorReais = precoMaior.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        let diaMaior = maiorPreco.dia

        let precoMenor = menorPreco.valor
        let precoMenorReais = precoMenor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        let diaMenor = menorPreco.dia

        document.getElementById('valuesInvoicingBigger').innerHTML = precoMaiorReais
        //document.getElementById('dia').innerHTML = dia

        document.getElementById('valuesInvoicingSmall').innerHTML = precoMenorReais
       // document.getElementById('diaMenor').innerHTML = diaMenor


        

        let media = averageValues(faturamentos) 
    
        let mediaReais = media.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        document.getElementById('daysBigger').innerHTML = mediaReais


        for ( d = 0; d < Object.keys(faturamentosJson).length; d++){
            if ( media < faturamentosJson[d].valor){
                qtdDias[d] = faturamentosJson[d]
            }
        }

        totalDias = Object.keys(qtdDias).length

        document.getElementById('amountDays').innerHTML = totalDias

    })
})


const biggerValue = (data) => {
    let bigger = data.reduce((valueOne, valueTwo) => valueOne > valueTwo ? valueOne : valueTwo)
    return bigger
}

const smallValue = (data) => {
    let small = data.reduce((valueOne, valueTwo) => valueOne < valueTwo ? valueOne : valueTwo)
    return small
}

const averageValues = (data) => {
    let average = data.reduce((valueOne, valueTwo) =>  valueOne + valueTwo)
    return average / divisorMédia
}



