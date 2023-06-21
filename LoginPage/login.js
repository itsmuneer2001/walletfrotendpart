// this is for login click for login page
function login(){
    window.open("http://127.0.0.1:5500/LoginPage/loginpage.html")
}
function userPage(){
    window.open("http://127.0.0.1:5500/UserPage/user.html")
}
function registerPage(){
    }
    function submitLogin(){
        let emailValue=document.getElementById("email").value
        let passwordValue=document.getElementById("password").value
        let loc_emailValue=localStorage.getItem("email")
        let loc_passwordValue=localStorage.getItem("password")
        if(emailValue===loc_emailValue && passwordValue===loc_passwordValue){
            window.open("http://127.0.0.1:5500/UserPage/user.html")

        }
        else{
            window.alert("incorrect password or email")
        }
    }
    let form=document.getElementById("login-form")
    console.log(form);

    form.addEventListener("submit" , (e)=>{
        e.preventDefault()
       let form1= new FormData(form)
       console.log(form1);
       let payLode=Object.fromEntries(form1)
       console.log(payLode);
    //    let json=JSON.stringify(payLode)
    //    console.log(json);
       //pass the url
    //    window.location.href("")
    })