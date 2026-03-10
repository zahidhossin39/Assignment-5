document.getElementById("login-btn").addEventListener("click",()=>{
    // usernameInput
    const usernameInput=document.getElementById("input-username")
    const userName = usernameInput.value;
    console.log(userName);

    // PasswordInput 
    const PasswordInput=document.getElementById("input-password")
    const password =PasswordInput.value;
    console.log(password);

    if (userName =="admin" && password =="admin123"){
        alert("login Success")

        window.location.assign("/home.html")
        window.location.href = "home.html";
    }else{
        alert("Login Failed");
        return;
    }
})


