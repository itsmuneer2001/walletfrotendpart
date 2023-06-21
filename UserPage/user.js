 
let student_value=document.getElementsByClassName("student_values")

student_value[0].textContent=sessionStorage.getItem("id")
student_value[1].textContent=sessionStorage.getItem("name")
let ph=sessionStorage.getItem("phno")
student_value[2].textContent=(`${ph.slice(0,2)}`+"*******"+`${ph.slice(0.-2)}`)

/* ------------------------------------create Amount process-------------------------   */ 
document.getElementById("create_Account").addEventListener("click",()=>{
    let user_details=document.getElementById("user_details")
    user_details.setAttribute("class","User_details_class")
      document.getElementById("user_details").innerHTML=`<div id="remove_CreateAccount">
      <form action="" id="form_create" onsubmit="onsubmitCreate()">
      <option selected hidden>MINIMUM TRANSACTION</option>
      <select name="minBal" id="select_user" onclick="onClickSelect()">
      <option  selected hidden>MINIMUM TRANSACTION</option>
          <option >0</option>
          <option >100</option>
          <option >1000</option>
          <option >10000</option>
         </select><br><br>
        <input name="password" id="pass_user_create_Account" class="user_inputs" type="password" placeholder="password"><i onmousedown="eyeOpenePassword()" onmouseup="eyeclosePassword()" id="eye_close" class="fa-solid fa-eye"></i><br><br>
        <input name="conformPassword" id="con_pass_user_create_Account" class="user_inputs" type="password" placeholder="conform password"><i onmousedown="eyeOpenConfirmPassword()" onmouseup="eyecloseConfirmPassword()" id="conform_close" class="fa-solid fa-eye"></i><br><br>
        <input name="amount" id="user_create_Account" class="user_inputs" type="number" placeholder="Enter Amount"><br><br>
        <button id="Proceed_btn">Proceed</button>
        
      </form>
     </div>`
     
})
function eyeOpenePassword(){
    let password=document.getElementById("pass_user_create_Account")
    password.removeAttribute("type")
    password.setAttribute("type","text")
    let openEye=document.getElementById("eye_close")
    openEye.setAttribute("class","fa-solid fa-eye-slash")
}
function eyeclosePassword() {
    let password=document.getElementById("pass_user_create_Account")
    password.removeAttribute("type")
    password.setAttribute("type","password")
    let openEye=document.getElementById("eye_close")
    openEye.setAttribute("class","fa-solid fa-eye")
}
function eyeOpenConfirmPassword() {
    let password=document.getElementById("con_pass_user_create_Account")

    password.setAttribute("type","text")
    let openEye=document.getElementById("conform_close")
    openEye.setAttribute("class","fa-solid fa-eye-slash")
}
function eyecloseConfirmPassword() {
    let password=document.getElementById("con_pass_user_create_Account")
    
       password.setAttribute("type","password")
       let openEye=document.getElementById("conform_close")
       openEye.setAttribute("class","fa-solid fa-eye")
}
function onClickSelect(){
    let select=document.getElementById("select_user")
    select.style.border="none"
    select.style.outline="none"
}
 let onsubmitCreate=()=>{
    event.preventDefault()
    let form=document.getElementById("form_create")
    let formdata=new FormData(form)
    let obj=Object.fromEntries(formdata)
   obj.minBal=Number(obj.minBal) 
   obj.amount=Number(obj.amount)
   
  let  validate_password=createUserPassword(obj.password)
  let validate_con_pass =createUserConfirmPassword(obj.conformPassword,obj.password)
  let  validate_amount=createUserAmount(obj.amount,obj.minBal)
 if(validate_password && validate_con_pass && validate_amount){
    console.log(obj);
    delete obj.conformPassword
    
     let json=JSON.stringify(obj)
     console.log(json);
     console.log(sessionStorage.getItem("id"));
     let fet=fetch(`http://localhost:8080/accounts/${Number(sessionStorage.getItem("id"))}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            
        },
        body:json
     })
     fet.then((x)=>x.json())
     .then((x)=>{
      let fet1 = fetch(`http://localhost:8080/accounts/${x.id}`)
      console.log(typeof x.id);
      fet1.then((x1)=>x1.json())
        .then((x1)=>{
            sessionStorage.setItem("AccountId",x1.id)
            sessionStorage.setItem("AccNo",x1.accNo)
            sessionStorage.setItem("minBal",x1.minBal)
            sessionStorage.setItem("intAmt",x1.intAmt)
            sessionStorage.setItem("amount",x1.amount)
            sessionStorage.setItem("accountPass",x1.password)
        })
     })

    document.getElementById("user_details").innerHTML=`<span id="user_remove">
    <div id="div_circle">
   <i id="user_icon" class="fa-sharp fa-solid fa-user-tie fa-5x"></i>
    </div>
    <p class="student">Student id: <span class="student_values"></span></p>
    <p class="student">Student Name:<span class="student_values"></span></p>
    <p class="student">Student Phno:<span class="student_values"></span></p>
    
   
   </span>`
   let student_value=document.getElementsByClassName("student_values")

   student_value[0].textContent=sessionStorage.getItem("id")
   student_value[1].textContent=sessionStorage.getItem("name")
   let ph=sessionStorage.getItem("phno")
student_value[2].textContent=(`${ph.slice(0,2)}`+"*******"+`${ph.slice(0.-2)}`)
 }

}

 function createUserPassword(password){
passwordElement=document.getElementById("pass_user_create_Account")
if(password.length>5){
    passwordElement.style.border=''
    return true
}else{
    passwordElement.style.border='2px solid red'
    return false
}

}

function createUserConfirmPassword(confirmPassword,password){
    let confirmPasswordElement=document.getElementById("con_pass_user_create_Account")
    if(confirmPassword===password&& confirmPassword!==""){
        confirmPasswordElement.style.border=""
        return true
       }
       else{
        confirmPasswordElement.style.border="2px solid red"
        return false
       }
}
function createUserAmount(amount,minBal){
    if(minBal===0&&amount !=""){
        if(amount>=0){
          return true
        }else{
            window.alert("it does not allow negativevalues")
        }
    }else if(minBal===100&&amount !=""){
         if(amount>=100){
            return true
         }else{
            window.alert("Amount should minimum 100 rupes")
         }
    }
    else if(minBal===1000&&amount !=""){
         if(amount>=1000){
            return true
         }else{
            window.alert("Amount  should minimum 1000 rupes")
         }
    }
    else if(minBal===10000&&amount !=""){
        if(amount>=10000){
            return true
        }else{
           window.alert("Amount  should minimum 10000 rupes")
        }
   }
}


/*--------------------------GET ACCOUNT----------------------------------------------*/
document.getElementById("get_Account").addEventListener('click',()=>{
    let user_details=document.getElementById("user_details")
    user_details.setAttribute("class","User_details_class")
    let amount=sessionStorage.getItem("amount");
    if (amount==null) {
        document.getElementById("user_details").innerHTML=` <div id="remove_getAmount">
        
        <h1 id="getId_error_messane">
            Please Create your Account
        </h1>
       </div>`
    }
    else{
        document.getElementById("user_details").innerHTML=` <div id="remove_getAmount">
    <h1 id="user_detilas">User Details</h1>
    <p class="get_User_details">ID:<span class="get_User_values"></span></p>
    <p class="get_User_details">Name:<span class="get_User_values"></span></p>
    <p class="get_User_details">Phone:<span class="get_User_values"></span></p>
    <p class="get_User_details">Account No:<span class="get_User_values"></span></p>
    <p class="get_User_details">Amount:<span class="get_User_values"></span></p>
</div>`
    let user_getvalues=document.getElementsByClassName("get_User_values")
    user_getvalues[0].textContent=sessionStorage.getItem("id")
    user_getvalues[1].textContent=sessionStorage.getItem("name")
    user_getvalues[2].textContent=sessionStorage.getItem("phno")
    user_getvalues[3].textContent=sessionStorage.getItem("AccNo")
    user_getvalues[4].textContent=sessionStorage.getItem("amount")
    }
})
/*------------------------upadte Account------------------------------------ */
document.getElementById("update_Account").addEventListener("click",()=>{
    let user_details=document.getElementById("user_details")
    user_details.setAttribute("class","User_details_class")
    let amount=sessionStorage.getItem("amount");
    if (amount==null) {
        document.getElementById("user_details").innerHTML=` <div id="remove_getAmount">
        
        <h1 id="update_error_messane">
            Please Create your Account
        </h1>
       </div>`
    }else{
    document.getElementById("user_details").innerHTML=`<div id="remove_updateUser">
    <p id="update_acc_col">Account NO: <span id="update_details_color"></span></p>
    <form action="" id="form_update" onsubmit="onsubmitUpdate()">
       <select name="minBal" id="select_user" onclick="onClickSelect()">
       <option selected hidden>MINIMUM TRANSACTION</option>
           <option >0</option>
           <option >100</option>
           <option >1000</option>
           <option >10000</option>
   
          </select><br><br>
         <input name="password" id="pass_user_create_Account" class="user_inputs" type="password" placeholder="password"><i onmousedown="eyeOpenePassword()" onmouseup="eyeclosePassword()" id="eye_close" class="fa-solid fa-eye"></i><br><br>
         <input name="confirmPassword" id="con_pass_user_create_Account" class="user_inputs" type="password" placeholder="conform password"><i onmousedown="eyeOpenConfirmPassword()" onmouseup="eyecloseConfirmPassword()" id="conform_close" class="fa-solid fa-eye"></i><br><br>
         <input name="amount" id="user_create_Account" class="user_inputs" type="number" placeholder="Enter Amount"><br><br>
         
         <button id="Proceed_btn">Proceed</button>
       </form>

  </div>`
  document.getElementById("update_details_color").textContent=sessionStorage.getItem("AccNo")
    }
})
function onsubmitUpdate(){
    event.preventDefault()
   let form=document.getElementById("form_update")
   let formdata=new  FormData(form);
   let obj=Object.fromEntries(formdata)
   
   obj.minBal=Number(obj.minBal)
   obj.amount=Number(obj.amount)
   obj.id=Number(sessionStorage.getItem("AccountId"))
//    obj.intAmt=Number(sessionStorage.getItem("intAmt"))
   
   obj.accNo=sessionStorage.getItem("AccNo")
   let  validate_password=updateUserPassword(obj.password)
  let validate_con_pass =updateUserConfirmPassword(obj.confirmPassword,obj.password)
  let  validate_amount=updateUserAmount(obj.amount,obj.minBal)
  if(validate_password && validate_con_pass && validate_amount){
    delete obj.confirmPassword
    let jsonform=JSON.stringify(obj)
    let fet11=fetch(`http://localhost:8080/accounts/${Number(sessionStorage.getItem("id"))}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            
        },
        body:jsonform
     })
     fet11.then((x)=>x.json())
  .then((x)=>{
    sessionStorage.setItem("AccountId",x.id)
    sessionStorage.setItem("AccNo",x.accNo)
    sessionStorage.setItem("minBal",x.minBal)
    sessionStorage.setItem("intAmt",x.intAmt)
    sessionStorage.setItem("amount",x.amount)
    sessionStorage.setItem("accountPass",x1.password)
  })
    document.getElementById("pass_user_create_Account").value="" 
    document.getElementById("con_pass_user_create_Account").value="" 
    document.getElementById("user_create_Account").value="" 
    document.getElementById("select_user").value="0"
    document.getElementById("update_details_color").textContent=sessionStorage.getItem("AccNo")

    
  }
  
   
}
function updateUserPassword(password){
    passwordElement=document.getElementById("pass_user_create_Account")
    if(password.length>5){
        passwordElement.style.border=''
        return true
    }else{
        passwordElement.style.border='2px solid red'
        return false
    }
    
    }
    
    function updateUserConfirmPassword(confirmPassword,password){
        let confirmPasswordElement=document.getElementById("con_pass_user_create_Account")
        if(confirmPassword===password&& confirmPassword!==""){
            confirmPasswordElement.style.border=""
            return true
           }
           else{
            confirmPasswordElement.style.border="2px solid red"
            return false
           }
    }
    function updateUserAmount(amount,minBal){
        if(minBal===0&&amount !=""){
            if(amount>=0){
              return true
            }else{
                window.alert("it does not allow negativevalues")
            }
        }else if(minBal===100&&amount !=""){
             if(amount>=100){
                return true
             }else{
                window.alert("Amount should minimum 100 rupes")
             }
        }
        else if(minBal===1000&&amount !=""){
             if(amount>=1000){
                return true
             }else{
                window.alert("Amount  should minimum 1000 rupes")
             }
        }
        else if(minBal===10000&&amount !=""){
            if(amount>=10000){
                return true
            }else{
               window.alert("Amount  should minimum 10000 rupes")
            }
       }
    }

/*----------------------------- delete Account----------------------------------*/
document.getElementById("delete_Account").addEventListener('click',()=>{
    let user_details=document.getElementById("user_details")
    user_details.setAttribute("class","User_details_class")
    let amount=sessionStorage.getItem("amount");
    if (amount==null) {
        document.getElementById("user_details").innerHTML=` <div id="delete_account_div">
        
        <h1 id="delete_error_messane">
            Please Create your Account
        </h1>
       </div>`
    }else{
    document.getElementById("user_details").innerHTML=`<div id="delete_account_div">
    <form  id="delete-form" onsubmit="onclickDelete()">
      <br>
      <br>
      <input id="delete_account_number" class="delete_inputs"  type="text" placeholder="Enter Account NO"><br><br>
      <input id="delete_account_password" class="delete_inputs"   type="password" placeholder="Enter Your Password"><i onmousedown="eyeOpenePassword()" onmouseup="eyeclosePassword()" id="eye_close" class="fa-solid fa-eye"></i> <br><br>
    
      <button id="delete_btn">DELETE</button>
    </form>
   </div>`
    }
})
function eyeOpenePassword(){
    let password=document.getElementById("delete_account_password")
    password.removeAttribute("type")
    password.setAttribute("type","text")
    let openEye=document.getElementById("eye_close")
    openEye.setAttribute("class","fa-solid fa-eye-slash")
}
function eyeclosePassword() {
    let password=document.getElementById("delete_account_password")
    password.removeAttribute("type")
    password.setAttribute("type","password")
    let openEye=document.getElementById("eye_close")
    openEye.setAttribute("class","fa-solid fa-eye")
}
 function onclickDelete(){
  event.preventDefault();
  let accountNo=document.getElementById("delete_account_number")
  let password=document.getElementById("delete_account_password")
  let sess_account=sessionStorage.getItem("AccNo")
  let sess_pass=sessionStorage.getItem("accountPass")
  if(accountNo.value===sess_account && password.value===sess_pass){
    let confirm =window.confirm("delete your account")
    if(confirm){
        fetch(`http://localhost:8080/accounts/${Number(sessionStorage.getItem("AccountId"))}`,{
            method:"DELETE"
        })
        sessionStorage.removeItem("AccountId");
        sessionStorage.removeItem("AccNo")
        sessionStorage.removeItem("minBal")
        sessionStorage.removeItem("intAmt")
        sessionStorage.removeItem("amount")
        sessionStorage.removeItem("accountPass")
        document.getElementById("user_details").innerHTML=` <div id="delete_account_div">
        
        <h1 id="getId_error_messane">
            Please Create your Account
        </h1>
       </div>`
    }
  }else{
       if(accountNo!==sess_account){
        accountNo.style.border="2px solid red"
       }
       if(password!==sess_pass){
        password.style.border="2px solid red"
       }
  }
  
   
   
 }

 /* ----------------------Payment Account----------------------------------*/
 
 document.getElementById("payment_Account").addEventListener('click',()=>{
    let user_details=document.getElementById("user_details")
    user_details.setAttribute("class","User_details_class")
    document.getElementById("user_details").innerHTML=`<div id="payment_Account_remove">
         
    <form action="">
        <br><br>
        <input   type="button" class="payment_inputs" value="Send Amount" onclick="sendAmountOnclick()"><br><br>
        <input type="button" class="payment_inputs" value="Recieve Amount" onclick="recieveAmountOnclick()"<><br><br>
        <input type="button"class="payment_inputs" value="Check Balance" onclick="checkBalanceOnclick()">
    </form>
   </div>
   
    </div>`
 })



                       /*----------------send------------------------*/

    function sendAmountOnclick(){
        let user_details=document.getElementById("user_details")
    user_details.setAttribute("class","User_details_class")
    let amount=sessionStorage.getItem("amount");
    if (amount==null) {
        document.getElementById("user_details").innerHTML=` <div id="send_Amount_Details">
        
        <h1 id="send_error_messane">
            Please Create your Account
        </h1>
       </div>`
    }else{
        document.getElementById("user_details").innerHTML=`<div id="send_Amount_Details">
        <form  onsubmit="sendAmountOnclickfunction()">
            <input type="number" id="send_amount_id" class="send_Amount_inputs" placeholder="Enter Amount"><br><br>
            <input type="password" id="send_amount_pass" class="send_Amount_inputs" placeholder="Enter password"><br><br>

            <button id="send_Amount_btn">Send</button>
        </form>

     </div>`
    }
    }
    function sendAmountOnclickfunction(){
      event.preventDefault();
      let amount_Ele=document.getElementById("send_amount_id")
      let amount=amount_Ele.value
      amount=Number(amount)
     
      let  password_Ele=document.getElementById("send_amount_pass")
      let password=password_Ele.value
       let sess_password=sessionStorage.getItem("accountPass")
       let sess_amount=sessionStorage.getItem("amount")
       sess_amount=Number(sess_amount)
       if(amount>0&&password===sess_password){
          console.log(amount)
          console.log(typeof sess_amount);
           if(sess_amount<=amount){
            window.alert("insufficient Balance please check your balance")
            }
           else{
               let id=sessionStorage.getItem("AccountId")
             id=Number(id)
             fetch(`http://localhost:8080/accounts/send?id=${id}&amt=${amount}`,{
               method:"PATCH"
             })
             .then((x)=>x.json())
             .then((x)=>{
            sessionStorage.setItem("amount",x.amount)
             }) 
             .catch((x)=>{
                console.log(x);
                })
             password_Ele.style.border=""
            password_Ele.value=""
             amount_Ele.value=""
       
             }
       }else{
        console.log(amount);
        if(amount<=0){
            if(amount<0){
                window.alert("Negative values not Validate")
            }
            else if(amount===0){
                window.alert("0 values not Validate")
            }
            
        }
        
        if(password===""){
            alert("Empty String not allowed")
        }
       else if(password!==sess_password){
          password_Ele.style.border="2px solid red"
        }
        
       }
        


    }


                        /*-----------------Recieve balane-----------------------*/
    function recieveAmountOnclick(){
            let user_details=document.getElementById("user_details")
            user_details.setAttribute("class","User_details_class")
            let amount=sessionStorage.getItem("amount");
    if (amount==null) {
        document.getElementById("user_details").innerHTML=` <div id="send_Amount_Details">
        
        <h1 id="recieve_error_messane">
            Please Create your Account
        </h1>
       </div>`
    }else{
            document.getElementById("user_details").innerHTML=`<div id="Recieve_Amount_Details">
            <form  onsubmit="recieveAmountOnclickfunction()">
                <input type="number" id="recieve_amount_id" class="recieve_Amount_inputs" placeholder="Enter Amount"><br><br>
                <input type="password" id="recieve_amount_pass" class="recieve_Amount_inputs" placeholder="Enter password"><br><br>
                
                <button id="recieve_Amount_btn">Send</button>
            </form>

         </div>`
    }
    
          }      

          function recieveAmountOnclickfunction(){
          event.preventDefault()
          let amount_Ele=document.getElementById("recieve_amount_id")
      let amount=amount_Ele.value
      amount=Number(amount)
     
      let  password_Ele=document.getElementById("recieve_amount_pass")
      let password=password_Ele.value
       let sess_password=sessionStorage.getItem("accountPass")
       if(amount>0&&password===sess_password){
        let id=sessionStorage.getItem("AccountId")
        id=Number(id)
        fetch(`http://localhost:8080/accounts/receive?id=${id}&amt=${amount}`,{
            method:"PATCH"
        })
        .then((x)=>x.json())
        .then((x)=>{
            sessionStorage.setItem("amount",x.amount)
        }) 
        .catch((x)=>{
            console.log(x);
        })
        password_Ele.style.border=""
        password_Ele.value=""
        amount_Ele.value=""
       }else{
        console.log(amount);
        if(amount<=0){
            if(amount<0){
                window.alert("Negative values not Validate")
            }
            else if(amount===0){
                window.alert("0 values not Validate")
            }
            
        }
        
        if(password===""){
            alert("Empty String not allowed")
        }
       else if(password!==sess_password){
          password_Ele.style.border="2px solid red"
        }
        
       }
          
        }
         /* ----------------------check Balance-------------------------------------*/ 
         function checkBalanceOnclick(){
            let user_details=document.getElementById("user_details")
           user_details.setAttribute("class","User_details_class")
           let amount=sessionStorage.getItem("amount");
         if (amount==null) {
              document.getElementById("user_details").innerHTML=` <div id="send_Amount_Details">
        
            <h1 id="check_bal_error_messane">
            Please Create your Account
              </h1>
              </div>`
           } else{
            document.getElementById("user_details").innerHTML=`<div id="check_Amount_Details">
            <h1 id="check_balance_head">User Details </h1>
            <h1 class="check_Balance_Details">Name:<span class="check_Balance_values"></span></h1>
            <h1 class="check_Balance_Details">Account NO:<span class="check_Balance_values"></span></h1>
            <h1 class="check_Balance_Details">Balance Amount:<span class="check_Balance_values"></span></h1>
            <h1 id="thank">Thank you</h1>
            </div>`
            let id=sessionStorage.getItem("AccountId")
             id=Number(id)
            fetch(`http://localhost:8080/accounts/display/${id}`)
            .then((x)=>x.json())
            .then((x)=>{
             let check_balance=document.getElementsByClassName("check_Balance_values")
             check_balance[0].textContent=sessionStorage.getItem("name")
             check_balance[1].textContent=x.accNo
              check_balance[2].textContent=x.amount
              })
              .catch((x)=>{
                console.log(x);
              })
       
         }   

        }     
          /* ----------------------------User update-------------------------------*/ 
          document.getElementById("update_user").addEventListener('click',()=>{
           let user_details=document.getElementById("user_details")
           user_details.removeAttribute("class")
                 
            document.getElementById("user_details").innerHTML=`
            <div id=remove_updateUser> 
                
            <div id="Login_div_form">
               
               <form action="" id="update_form" onsubmit="updateUserOnSubmit()">
              
                
                <span id="id_error"></span><br>
                <input  id="user_id" name="id" type="text" placeholder="Enter User_Id " size="10" readonly>
                <br>
                <br>
                <span id="name_error"></span>
                <br>
                <input id="user_name"name="name" type="text" placeholder="Enter User_Name " size="33">
                <br>
                <br>
                <span id="email_error"></span>
                <br>
                <input id="user_email" name="email" type="email" placeholder="Enter User Email " size="33">
                <br>
                <br>
                <span id="number_error"></span>
                <br>
                <input id="user_phone" name="phno" type="number" placeholder="Enter User Phone No" size="10">
                <br>
                <br>
                <span id="pass_error"></span>
                <br>
                <input id="user_password" name="password" type="password" placeholder="Enter User Password " range="11" size="30" maxlength="15"><i onmousedown="onmouseDownupdate()"  onmouseup="onmouseupUpdate()" id="eye_close" class="fa-solid fa-eye"></i>
                <br>
                <br>
                <span id="conpass_error" ></span>
                <br>
                <input id="con_pass" type="password" name="confirmPassword" placeholder="Enter confirm code " size="30"><i onmousedown="onmouseDownupdate1()" onmouseup="onmouseupUpdate1()" id="conform_close" class="fa-solid fa-eye"></i>
                <br>
                <br>
                <button id="sub_btn">Submit</button> 
                <br>
                <br>
               </form>
            </div>
            </div>
           
        `
         let idEle=document.getElementById("user_id")
         idEle.value=sessionStorage.getItem("id")
         document.getElementById("user_name").value=sessionStorage.getItem("name")
         document.getElementById("user_email").value=sessionStorage.getItem("email")
         document.getElementById("user_phone").value=sessionStorage.getItem("phno")
         document.getElementById("user_password").value=sessionStorage.getItem("password")
        
          })
          let errorObjectUser={
            id:false,
            name:false,
            email:false,
            phno:false,
            password:false,
            conPass:false

          }

       function updateUserOnSubmit(){
        event.preventDefault()
        let UserForm=document.getElementById("update_form")
        let formdata= new FormData(UserForm)
        let obj= Object.fromEntries(formdata)
        
       
        let idElement=document.getElementById("user_id")
        let nameElement=document.getElementById("user_name")
        let emailElement=document.getElementById("user_email")
        let phnoElement=document.getElementById("user_phone")
        let passElement=document.getElementById("user_password")
        let pass_conElement=document.getElementById("con_pass")
        errorObjectUser.id =User_id(obj.id,idElement)
         errorObjectUser.name =User_name(obj.name,nameElement)
         errorObjectUser.phno=User_number(obj.phno,phnoElement)
          errorObjectUser.email=User_email(obj.email,emailElement)
          errorObjectUser.password=User_password(obj.password,passElement)
          errorObjectUser.conPass= User_con_password(obj.confirmPassword,pass_conElement,obj.password)
         let errorConfirm=!Object.values(errorObjectUser).includes(false)
         if(errorConfirm){
            
           
            delete obj.confirmPassword
            obj.id=Number(obj.id)
            obj.phno=Number(obj.phno)
            let jsonform=JSON.stringify(obj)
            console.log(jsonform);
            let fet=fetch("http://localhost:8080/users",{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body:jsonform
                
            })
           fet.then((x)=>x.json())
           .then((x)=>{
            sessionStorage.setItem("name",x.name)
            sessionStorage.setItem("email",x.email)
            sessionStorage.setItem("password",x.password)
            sessionStorage.setItem("phno",x.phno)
            sessionStorage.setItem("id",x.id)
            idElement.value=""
            nameElement.value=""
            emailElement.value=""
            phnoElement.value=""
            passElement.value=""
            pass_conElement.value=""
           })
           
         }
       }
       function User_id(id_value,id_element){
        if(id_value !==""){
            let id_Error=document.getElementById("id_error")
            id_Error.textContent=""
            id_Error.style.color="none";
            id_element.style.border="2px solid"
            return errorObjectUser.id=true
        }else{
           let id_Error=document.getElementById("id_error")
            id_Error.textContent="Please Enter Id"
            id_Error.style.color="red";
            id_element.style.border="2px solid red"
            return errorObjectUser.id=false
        }
    }
    
    function User_name(name_value,name_element){
        if(name_value.length>3){
            let name_Error=document.getElementById("name_error")
            name_Error.textContent=""
            name_Error.style.color="";
            name_element.style.border="2px solid "
            return errorObjectUser.name=true
        }else{
           let name_Error=document.getElementById("name_error")
            name_Error.textContent="Please Enter name"
            name_Error.style.color="red";
            name_element.style.border="2px solid red"
            return errorObjectUser.name=false
        }
    }
    function User_number(number_value,number_element){
        if(number_value.length===10){
            let number_Error=document.getElementById("number_error")
            number_Error.textContent=""
            number_Error.style.color="";
            number_element.style.border="2px solid "
             return errorObjectUser.phno=true
        }else{
            let number_Error=document.getElementById("number_error")
            number_Error.textContent="Please Enter number"
            number_Error.style.color="red";
            number_element.style.border="2px solid red"
            return errorObjectUser.phno=false
        }
    }
    function User_email(email_value,email_element){
        if(email_value !=="" && email_value.slice(0.-10)=='@gmail.com'){
            let email_Error=document.getElementById("email_error")
            email_Error.textContent=""
            email_Error.style.color="";
            email_element.style.border="2px solid "
            return errorObjectUser.email=true
        }else{
           let email_Error=document.getElementById("email_error")
            email_Error.textContent="Please Enter email"
            email_Error.style.color="red";
            email_element.style.border="2px solid red"
            return errorObjectUser.email=false
            
        }
    }
    function User_password(password_value,password_element){
        if(password_value.length>5){
            let password_Error=document.getElementById("pass_error")
            password_Error.textContent=""
            password_Error.style.color="";
            password_element.style.border="2px solid"
            return errorObjectUser.password=true
        }else{
            let password_Error=document.getElementById("pass_error")
            password_Error.textContent="Please Enter Password"
            password_Error.style.color="red";
            password_element.style.border="2px solid red"
            return errorObjectUser.password=false
        }
    }
    function User_con_password(password_value,conform_element,conform_pass){
        if(conform_pass===password_value&&conform_pass!==""&&conform_pass.length>5){
            let conpass_Error=document.getElementById("conpass_error")
            conpass_Error.textContent=""
            conpass_Error.style.color="";
            conform_element.style.border="2px solid"
            return errorObjectUser.conPass=true
        }else{
            let conpass_Error=document.getElementById("conpass_error")
            conpass_Error.textContent=" Password mismatch"
            conpass_Error.style.color="red";
            conform_element.style.border="2px solid red"
            return errorObjectUser.conPass=false
        }
    }
    
       function onmouseDownupdate(){
        let password=document.getElementById("user_password")
        password.removeAttribute("type")
        password.setAttribute("type","text")
        let openEye=document.getElementById("eye_close")
        openEye.setAttribute("class","fa-solid fa-eye-slash")
       }
       function onmouseupUpdate(){
        let password=document.getElementById("user_password")
        password.removeAttribute("type")
        password.setAttribute("type","password")
        let openEye=document.getElementById("eye_close")
        openEye.setAttribute("class","fa-solid fa-eye")
       }
     function onmouseDownupdate1(){
        let password=document.getElementById("con_pass")

        password.setAttribute("type","text")
        let openEye=document.getElementById("conform_close")
        openEye.setAttribute("class","fa-solid fa-eye-slash")
     }
     function onmouseupUpdate1(){
        let password=document.getElementById("con_pass")
        
           password.setAttribute("type","password")
           let openEye=document.getElementById("conform_close")
           openEye.setAttribute("class","fa-solid fa-eye")
     }