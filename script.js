

let invoicingValue = []
let invoicingBigger = []
let invoicingSmall = []
let invoicingNotZero = []
let valueBiggerObject = []
let valuesSmallObject = []
let averageDivisor
let daysBiggerInvoicing = []
let totaldays

// CAPTURA DE DADOS DO ARQUIVO JSON 
fetch("assets/dados.json").then((response) => {
    response.json().then((dataJson) => {
        let invoicingJson = dataJson


// LÓGICA PARA CALCULAR O MAIOR FATURAMENTO OCORRIDO NO MÊS

        // LISTANDO TODOS VALORES DO MÊS
        for ( i = 0; i < Object.keys(invoicingJson).length; i++ ){
            invoicingValue[i] = invoicingJson[i].valor
        }

        // MÉTODO PARA RESGATAR O MAIOR VALOR DO MÊS
        let invoicingBigger = biggerValue(invoicingValue)

        // VARRENDO O ARRAY PARA ENCONTRAR O MÊS DO MAIOR VALOR
        for (x=0; x < Object.keys(invoicingJson).length; x++){
            if (invoicingBigger == invoicingJson[x].valor){
                valueBiggerObject = invoicingJson[x]
            }
        }

        // CAPTURANDO O VALOR E TRANSFORMANDO PARA O FORMATO DA MOEDA REAIS R$
        let valueBigger = valueBiggerObject.valor
        let reaisValueBigger = valueBigger.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        // EXIBINDO NO HTML
        document.getElementById('valuesInvoicingBigger').innerHTML = reaisValueBigger

        
// LÓGICA PARA CALCULAR O MENOR FATURAMENTO OCORRIDO NO MÊS
        
        // LISTANDO OS VALORES DOS DIAS COM FATURAMENTO
        for (y=0; y <  Object.keys(invoicingValue).length; y++){
            if( invoicingValue[y] > 0){
                invoicingNotZero[y] = invoicingValue[y]
            }
        }

        // MÉTODO PARA RESGATAR O MENOR VALOR DO MÊS
        let invoicingSmall = smallValue(invoicingNotZero)
        averageDivisor = Object.keys(invoicingNotZero).length

        // VARRENDO O ARRAY PARA ENCONTRAR O MÊS DE MENOR VALOR
        for ( z = 0; z < Object.keys(invoicingNotZero).length; z++ ){
            if (invoicingSmall == invoicingJson[z].valor){
                valuesSmallObject = invoicingJson[z]
            }
        }

        // CAPTURANDO O VALOR E TRANSFORMANDO PARA O FORMATO DA MOEDA REAIS R$
        let valuesSmall = valuesSmallObject.valor
        let reaisValuesSmall = valuesSmall.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        // EXIBINDO NO HTML
        document.getElementById('valuesInvoicingSmall').innerHTML = reaisValuesSmall

  
// LÓGICA PARA CALCULAR A MÉDIA DE FATURAMENTO DO MÊS

        // MÉTODO PARA CALCULAR A MÉDIA DE FATURAMENTO
        let average = averageValues(invoicingValue) 

        // CAPTURANDO O VALOR E TRANSFORMANDO PARA O FORMATO DA MOEDA REAIS R$
        let reaisAverage = average.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        // EXIBINDO NO HTML
        document.getElementById('daysBigger').innerHTML = reaisAverage


// LÓGICA PARA CALCULAR O TOTAL DE DIAS QUE O FATURAMENTO FOI MAIOR QUE A MÉIDA MENSAL

        // LISTANDO FATURMANETOS MAIOR QUE A MÉDIA MENSAL
        for ( d = 0; d < Object.keys(invoicingJson).length; d++){
            if ( average < invoicingJson[d].valor){
                daysBiggerInvoicing[d] = invoicingJson[d]
            }
        }

        // LENDO QUANDIDADE DE DIAS
        totaldays = Object.keys(daysBiggerInvoicing).length

        // EXIBINDO NO HTML
        document.getElementById('amountDays').innerHTML = totaldays   

    })
})

// MÉTODOS

// MÉTODO PARA CALCULAR MAIOR VALOR
const biggerValue = (data) => {
    let bigger = data.reduce((valueOne, valueTwo) => valueOne > valueTwo ? valueOne : valueTwo)
    return bigger
}

// MÉTODO PARA CALCULAR MENOR VALOR
const smallValue = (data) => {
    let small = data.reduce((valueOne, valueTwo) => valueOne < valueTwo ? valueOne : valueTwo)
    return small
}

// MÉTODO PARA CALCULAR A MÉDIA
const averageValues = (data) => {
    let average = data.reduce((valueOne, valueTwo) =>  valueOne + valueTwo)
    return average / averageDivisor
}



