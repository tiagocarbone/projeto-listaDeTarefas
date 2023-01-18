const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')


btnTarefa.addEventListener('click', function(){
    if (!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
    
})

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
        
    }
    
})

function limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criaTarefa(textoInput){ 
    const li = criaLi()
    li.innerText = textoInput
    tarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefa()
}




function criaLi(){
    const li = document.createElement('li')
    return li
}

function criaBotaoApagar(li){
    li.innerText += ' '
    let botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    //botaoApagar.classList.add('apagar')
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
    
}

document.addEventListener('click', function(e){
    const el = e.target
    
    if (el.classList.contains('apagar')){
       el.parentElement.remove()
       //console.log(el.parentElement)
       salvarTarefa()
    }
})


function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)  
    console.log(listaDeTarefas)
}


function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}
adicionaTarefasSalvas()