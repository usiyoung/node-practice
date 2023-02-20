const list = document.querySelector('.info')
const form = document.querySelector('#form')
const showUpdateForm = document.querySelector('#btn')
const updateInput = document.querySelector('#updateInput')
const updateBtn = document.querySelector('#updateBtn')

document.getElementById('form').addEventListener('submit',async (e) => {
  e.preventDefault();
  const {username, password} = e.target
  const user = {
    name: username.value,
    password: password.value,
  }

  try{
    const { data } = await axios.post('/user', user)
    console.log(Object.values(data)[0])
    const key = Object.keys(data)[0]
    const {name, password} = Object.values(data)[0]
    list.innerHTML = `${name}님 환영합니다!`
    form.style.display = "none";
    showUpdateForm.style.display = 'inline-block'
    
    showUpdateForm.addEventListener('click', () => {
      showUpdateForm.style.display = "none"
      updateForm.style.display = "inline-block"
    })
    
    updateBtn.addEventListener('click', async (e) => {
      const id = updateInput.value;
      const { data } = await axios.put('/user/'+ key, { name: id })
      const { name } = Object.values(data)[0]
      list.innerHTML = `${name}님 환영합니다!`
      showUpdateForm.style.display = 'inline-block'
      updateForm.style.display = "none"
    })
  }catch(err){
    console.log(err)
  }
})