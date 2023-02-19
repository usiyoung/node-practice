document.getElementById('form').addEventListener('submit',async (e) => {
  e.preventDefault();
  const {username, password} = e.target

  const user = {
    name: username.value,
    password: password.value,
  }
  try{
    const { data: {name, password} } = await axios.post('/user', user)
    const list = document.querySelector('.username')
    list.innerHTML = `${name} 환영합니다!`
    
  }catch(err){
    console.log(err)
  }
})