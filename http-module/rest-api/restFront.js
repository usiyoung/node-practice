document.getElementById('form').addEventListener('submit',async (e) => {
  e.preventDefault();
  const {username, password} = e.target

  const user = {
    name: username.value,
    password: password.value,
  }
  try{
    const { data } = await axios.post('/user', user)
    document.getElementById('username').innerHTML = data
    
  }catch(err){
    console.log(err)
  }
})