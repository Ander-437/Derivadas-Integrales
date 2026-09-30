

const main = document.getElementById('main')

const derivada = document.querySelector('#derivada')
const integral = document.querySelector('#integral')
const operation = document.querySelector('#operacion')
const ecuacion = document.querySelector('#ecuacion')
let funcion = document.querySelector('#funcion')

const solve = document.getElementById('solve')

const restart = document.querySelector('.restart')

let answers = []
let inputs

restart.addEventListener('mouseenter', () => {
        restart.classList.add('restartOn')
})
restart.addEventListener('mouseleave', () => {
    restart.classList.remove('restartOn')
})
restart.addEventListener('click', () => {
    restart.classList.remove('restartOn')

    funcion.innerHTML = ''

    lastFunc = document.querySelector('.answerSection')
    if (lastFunc) {
        lastFunc.remove()
    }
    numTerms = 0
    restart.style.display = 'none'
    minus.style.display = 'none'
    derivada.classList.remove('seleccionado', 'noSeleccionado')
    integral.classList.remove('seleccionado', 'noSeleccionado')
    operator1.innerHTML = ''
    operator2.innerHTML = ''

    console.log()
    
    AddTerm(0)
})


const operator1 = document.getElementById('operator1')
const operator2 = document.getElementById('operator2')


const imgPar = document.createElement('img')
imgPar.src = 'parentesis.jpeg'
imgPar.classList.add('der')

const imgPar2 = document.createElement('img')
imgPar2.src = 'parentesis.jpeg'
imgPar2.classList.add('der')
const derivate = document.createElement('span')
derivate.textContent = "'"
derivate.classList.add('d')

const imgInt = document.createElement('img')
imgInt.src = 'integral.jpeg'
imgInt.classList.add('int')


//--------------términos---------------//

const plus = document.querySelector('#plus')
const minus = document.querySelector('#minus')

minus.addEventListener('click', () => {
    DeleteTerm()
})

let numTerms = 0

let newNumTerms = 0

function AddTerm(value) {
    numTerms++
    console.log('numero de terminos', numTerms)

    let newTerm = document.createElement('span')
    newTerm.classList.add('termino')

    let newNum = document.createElement('input')
    newNum.classList.add('numero')
    newNum.value = value != 'C' ? value : 0
    newNum.type = 'text'

    
    newNum.addEventListener('input', (e) => {
        const caracteres = e.target.value.length || 1;
        e.target.style.width = `${caracteres + 0.5}ch`
    })
    
    newNum.style.width = `${(newNum.value.length || 1) + 0.5}ch`
    
    newTerm.appendChild(newNum)

    if (numTerms != 1) {

        let newX = document.createElement('span')
        if (numTerms == 2) {
            newX.textContent = 'X'
            
        }
        else {
            newX.textContent = `X^${numTerms - 1}`
        }
        newTerm.appendChild(newX)

        let newPlus = document.createElement('span')
        newPlus.classList.add('mas')
        newPlus.textContent = '+'

        newTerm.appendChild(newPlus)
    }

    funcion.prepend(newTerm)
    
    if (numTerms >= 2) {
        createRestart()

        minus.style.display = 'flex'
    }
}

AddTerm(0)

function DeleteTerm() {
    numTerms--
    console.log('numero de terminos', numTerms)
    funcion.firstElementChild.remove()

    if (numTerms == 1) {
        minus.style.display = 'none'
        restart.style.display = 'none'
    }

}

function resolver(operacion) {

    createRestart()

    console.log(operacion)

    lastFunc = document.querySelector('.answerSection')

    if (lastFunc) {
        lastFunc.remove()
    }

    newNumTerms = 0

    inputs = document.querySelectorAll('.numero')

    answers = []
    results = []

    inputs.forEach((number) => {
        answers.push(number.value)
    })

    console.log('inputs', answers)

    const newFunction = document.createElement('article')
    newFunction.id = 'nuevaFuncion'


    if (operacion === 'derivada') {
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] == 'c' || answers[i] == 'C') {
                results[i] = 0
                continue
            }
            results[i] = answers[i] * (answers.length -1 - i)
        }

        console.log("derivada", results)
        

        if (results.length != 1) {
            results.pop()
            console.log('resultados:', results)
            results.reverse()  
        }
    }

    else if (operacion === 'integral') {
        for (let i = 0; i < answers.length; i++) {
            if ((answers[i] % (answers.length - i) == 0)) {
                results[i] = answers[i] / (answers.length - i)
            }
            else {
                results[i] = `${answers[i]}/${answers.length - i}`
            }
        }

        console.log('integral', results)

        results.push('C')
        console.log('resultados:', results)
        results.reverse()  
        
    }
    

    results.forEach(term => {
        mostrarFuncion(term, newFunction)
    })

    const answer = document.createElement('section')
    answer.classList.add('answerSection')


    copiar = document.createElement('button')
    copiar.classList.add('copiar')
    copiar.textContent = 'Copiar'

    copiar.addEventListener('click', () => {
        numTerms = 0
        funcion.innerHTML = ''
        
        results.forEach(term => {
            AddTerm(term)
        })
        console.log(results)
    })


    answer.appendChild(newFunction)

    answer.appendChild(copiar)

    main.appendChild(answer)
}



function mostrarFuncion(value, func) {
    let newTerm = document.createElement('span')
    newTerm.classList.add('termino')

    let newNum = document.createElement('span')
    newNum.classList.add('numero')
    newNum.textContent = value

    const caracteres = newNum.textContent.length || 1;
    newNum.style.width = `${caracteres + 0.5}ch`
    
    newTerm.appendChild(newNum)

    let firstElement = false
    if (!firstElement) {
        if (value != 0) {
            firstElement = true
        }
    }

    if (newNumTerms != 0) {

        let newX = document.createElement('span')
        if (newNumTerms == 1) {
            newX.textContent = 'X'
            
        }
        else {
            newX.textContent = `X^${newNumTerms}`
        }
        newTerm.appendChild(newX)

        if (firstElement) {
            let newPlus = document.createElement('span')
            newPlus.classList.add('mas')
            newPlus.textContent = '+'
    
            newTerm.appendChild(newPlus)
        }

    }
    newNumTerms++
    console.log('numterms', newNumTerms)

    console.log('value', value)
    
    if (newNumTerms == 1) {
        func.appendChild(newTerm)
    }
    else {

        if (value != 0) {
            func.prepend(newTerm)

        }
    }
}


function createRestart() {
    const lastRestart = document.querySelector('.restart')

    if (lastRestart.style.display == 'block') {
        console.log('Ya existe restart')
        return
    }
    console.log('no existe restart')

    restart.style.display = 'block'

    
}


derivada.addEventListener('mouseenter', () => {
    derivada.classList.add('DerOn')
})
derivada.addEventListener('mouseleave', () => {
    derivada.classList.remove('DerOn')
})

derivada.addEventListener('click', (e) => {
    derivada.classList.remove('DerOn')
    derivada.classList.add('seleccionado')
    derivada.classList.remove('noSeleccionado')
    
    integral.classList.add('noSeleccionado')
    integral.classList.remove('seleccionado')
    
    operator1.innerHTML = ''
    operator2.innerHTML = ''
    
    operator1.appendChild(imgPar)
    operator2.appendChild(imgPar2)
    operator2.appendChild(derivate)
})


integral.addEventListener('mouseenter', () => {
    integral.classList.add('IntOn')
})
integral.addEventListener('mouseleave', () => {
    integral.classList.remove('IntOn')
})
integral.addEventListener('click', () => {
    integral.classList.remove('IntOn')
    integral.classList.add('seleccionado')
    integral.classList.remove('noSeleccionado')
    
    derivada.classList.remove('seleccionado')
    derivada.classList.add('noSeleccionado')

    operator1.innerHTML = ''
    operator2.innerHTML = ''

    operator1.appendChild(imgInt)
    operator2.textContent = 'dx'
})

plus.addEventListener('click', () => {
    AddTerm(0)

})

solve.addEventListener('mouseenter', () => {
    solve.classList.add('solveMouse')
})
solve.addEventListener('mouseleave', () => {
    solve.classList.remove('solveMouse')
})

solve.addEventListener('click', () => {
    solve.classList.remove('solveMouse')

    operacion = document.querySelector('.seleccionado')
    
    if (operacion != null) {

        console.log('operacion', operacion.id)
        resolver(operacion.id)

    }
    
})


const helpButton = document.getElementById('ayuda')
const helpPannel = document.querySelector('.panelAyuda')
const closePannel = document.getElementById('cerrarPanel')

helpButton.addEventListener('click', () => {
    helpPannel.classList.add('panelActivo')
})

closePannel.addEventListener('click', () => {
    helpPannel.classList.remove('panelActivo')
})