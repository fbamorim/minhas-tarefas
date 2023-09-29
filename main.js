let listaDeTarefas = []
let editarTarefa

const form = document.getElementById('form-itens')
const itensInput = document.getElementById('receber-item')
const ulItens = document.getElementById('lista-de-itens')
const ulItensAdicionados = document.getElementById('itens-adicionados')
const recuperarTarefas = localStorage.getItem('listaDeTarefas')

function atualizarStorage() {
  localStorage.setItem('listaDeTarefas', JSON.stringify(listaDeTarefas))
}

if (recuperarTarefas) {
  listaDeTarefas = JSON.parse(recuperarTarefas)
  mostrarItem()
} else {
  listaDeTarefas = []
}

form.addEventListener('submit', function(evento) {
  evento.preventDefault()
  salvarTarefas()
  mostrarItem()
  itensInput.focus()
})

function salvarTarefas() {
  const tarefasItem = itensInput.value
  const verificaDuplicidade = listaDeTarefas.some((elemento) => elemento.valor.toUpperCase() === tarefasItem.toUpperCase())

  if (verificaDuplicidade) {
    alert('Tarefa já existe!')
  } else {
    listaDeTarefas.push({
       valor: tarefasItem,
       checar: false
     })
     
    }
    itensInput.value = ''
}

function mostrarItem() {
  ulItens.innerHTML = ''
  ulItensAdicionados.innerHTML = ''

  listaDeTarefas.forEach((elemento, index) => {
    if (elemento.checar) {
      ulItensAdicionados.innerHTML += `
      <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
          <input type="checkbox" checked class="is-clickable" />  
          <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
          <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
      </li>
      `
    } else {
      ulItens.innerHTML += `
      <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
      <div>
      <input type="checkbox" class="is-clickable" />
      <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(editarTarefa) ? 'disabled' : ''}></input>
      </div>
        <div>
          ${ index === Number(editarTarefa) ?
          `<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>` : 
          `<i class="fa-regular is-clickable fa-pen-to-square editar"></i>`
          }
          <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
      </li>
      `
    }
  })

  const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

  inputsCheck.forEach(i => {
    i.addEventListener('click', (evento) => {
      const valorElemento = (evento.target.parentElement.parentElement.getAttribute('data-value'))
      listaDeTarefas[valorElemento].checar = evento.target.checked
      mostrarItem()
    })
  })

  const deletarObjetos = document.querySelectorAll('.deletar')

  deletarObjetos.forEach(i => {
    i.addEventListener('click', (evento) => {
      const valorElemento = (evento.target.parentElement.parentElement.getAttribute('data-value'))
      listaDeTarefas.splice(valorElemento, 1)
      mostrarItem()
    })
  })

  const editarItens = document.querySelectorAll('.editar')

  editarItens.forEach(i => {
    i.addEventListener('click', (evento) => {
      editarTarefa = (evento.target.parentElement.parentElement.getAttribute('data-value'))
      mostrarItem()
    })
  })

  atualizarStorage()

}

function salvarEdicao() {
  const itemEditado = document.querySelector(`[data-value="${editarTarefa}"] input[type="text"]`)
  listaDeTarefas[editarTarefa].valor = itemEditado.value
  editarTarefa = -1
  mostrarItem()
}