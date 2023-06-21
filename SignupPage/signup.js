// let form_result={
//     id:false,
//     name:false,
//     email:false,
//     number:false,
//     password:false,
//     con_form:false
// }
// let success=false
// function registerfu() {
//     event.preventDefault()
//     let id=document.getElementById("id")
//     let name=document.getElementById("name")
//     let email=document.getElementById("email")
//     let number=document.getElementById("number")
//     let password=document.getElementById("password")
//     let conpass=document.getElementById("conformpassword")
//     console.log(id);
//     console.log(name);
//     console.log(email);
//     console.log(number);
//     console.log(password);
//     console.log(conpass);
//    form_result.id =User_id(id.value,id)
//    form_result.name= User_name(name.value,name)
//    form_result.email =User_email(email.value,email)
//    form_result.number= User_number(number.value,number)
//     form_result.password= User_password(password.value,password)
//     form_result.con_form=User_con_password(password.value,conpass,conpass.value)
//     console.log(form_result);
//     success=!Object.values(form_result).includes(false);
//     console.log(success);
//     if(success){
//        let result =document.getElementById("success")
//        result.textContent="Form Successfully Submit"
//        result.style.color="green"
//        let password_Add=password.value
//        let email_Add=email.value
//        localStorage.setItem("email",email_Add)
//        localStorage.setItem("password",password_Add)
//        id.value=""
//        name.value=""
//        email.value=""
//        number.value=""
//        password.value=""
//        conpass.value=""
//     }
//     else{
//         let result =document.getElementById("success")
//         result.textContent=""
//         result.style.color=""
//     }
// }
// function User_id(id_value,id_element){
//     if(id_value!==""){
//         let id_Error=document.getElementById("id_error")
//         id_Error.textContent=""
//         id_Error.style.color="none";
//         id_element.style.border="2px solid"
//         return form_result.id=true
//     }
//     else{
//         let id_Error=document.getElementById("id_error")
//          id_Error.textContent="Please Enter Id"
//          id_Error.style.color="red";
//          id_element.style.border="2px solid red"
//          return form_result.id=false
//      }
// }
// function User_name(name_value,name_element){
//     if(name_value.length>3){
//         let name_Error=document.getElementById("name_error")
//         name_Error.textContent=""
//         name_Error.style.color="";
//         name_element.style.border="2px solid "
//         return form_result.name=true
//     }else{
//        let name_Error=document.getElementById("name_error")
//         name_Error.textContent="Please Enter name"
//         name_Error.style.color="red";
//         name_element.style.border="2px solid red"
//         return form_result.name=false
//     }
// }

// function User_number(number_value,number_element){
//     if(number_value.length===10){
//         let number_Error=document.getElementById("phone_error")
//         number_Error.textContent=""
//         number_Error.style.color="";
//         number_element.style.border="2px solid "
//          return form_result.number=true
//     }else{
//         let number_Error=document.getElementById("phone_error")
//         number_Error.textContent="Please Enter number"
//         number_Error.style.color="red";
//         number_element.style.border="2px solid red"
//         return form_result.number=false
//     }
// }

// function User_email(email_value,email_element){
//     if(email_value !=="" && email_value.slice(0.-10)=='@gmail.com'){
//         let email_Error=document.getElementById("email_error")
//         email_Error.textContent=""
//         email_Error.style.color="";
//         email_element.style.border="2px solid "
//         return form_result.email=true
//     }else{
//        let email_Error=document.getElementById("email_error")
//         email_Error.textContent="Please Enter email"
//         email_Error.style.color="red";
//         email_element.style.border="2px solid red"
//         return form_result.email=false
        
//     }
// }

// function User_password(password_value,password_element){
//     if(password_value.length>5){
//         let password_Error=document.getElementById("pass_error")
//         password_Error.textContent=""
//         password_Error.style.color="";
//         password_element.style.border="2px solid"
//         return form_result.password=true
//     }else{
//         let password_Error=document.getElementById("pass_error")
//         password_Error.textContent="Please Enter Password"
//         password_Error.style.color="red";
//         password_element.style.border="2px solid red"
//         return form_result.password=false
//     }
// }

// function User_con_password(password_value,conform_element,conform_pass){
//     if(conform_pass===password_value&&conform_pass!==""&&conform_pass.length>5){
//         let conpass_Error=document.getElementById("conpass_error")
//         conpass_Error.textContent=""
//         conpass_Error.style.color="";
//         conform_element.style.border="2px solid"
//         return form_result.con_form=true
//     }else{
//         let conpass_Error=document.getElementById("conpass_error")
//         conpass_Error.textContent=" Password mismatch"
//         conpass_Error.style.color="red";
//         conform_element.style.border="2px solid red"
//         return form_result.con_form=false
//     }
// }
// // this is for login click for login page
// function login(){
//     window.open("http://127.0.0.1:5500/LoginPage/loginpage.html")
// }

// // this is for input color
// function bg_color() {
//     let result = Math.floor(Math.random()*10000).toString(16)      
//     // console.log(result);
//     document.body.style.backgroundColor = `#${result}`
// }
 

// document.getElementById("password").addEventListener("input",()=>{
//     let password=document.getElementById("password")
//     if(password.value.length<=5){
//         let password_Error=document.getElementById("pass_error")
//         password_Error.textContent="weak password"
//         password_Error.style.color="red";
//     }else{
//         let password_Error=document.getElementById("pass_error")
//         password_Error.textContent="good password"
//         password_Error.style.color="green";
//     }
// })

let form=document.getElementById("form")
console.log(form);
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    //formData is used to target to name attribute 
   let form1= new FormData(form)
   console.log(form1);
   let payLode=Object.fromEntries(form1)
   console.log(payLode);
   console.log(json);
})
fetch("http://localhost:8080/users",{
    method: 'POST',
    headers:{
       ' Content-Type':'application/json'
    },
    body:JSON.stringify(obj)
})
.then(Response =>Response.json())
.then(obj => {
    console.log(obj);
})
.catch(error =>{
    console.log("error");
})