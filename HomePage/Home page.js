// this is for click for sigup page
function signup(){
    window.open("http://127.0.0.1:5500/SignupPage/signup.html")
}

function aboutSelectOninput()
{
    document.getElementById('selectAbout').style.border="none"
    document.getElementById('selectAbout').style.outline="none"
}
function servicesSelectOninput()
{
    document.getElementById('selectService').style.border="none"
    document.getElementById('selectService').style.outline="none"
}
function aboutSelectOnchange()
{
    let aboutSelectValue=document.getElementById('selectAbout').value
    if(aboutSelectValue=='JSPIDERS')
    {
        window.open("https://jspiders.com/")
    }
    else if(aboutSelectValue=='CEO')
    {
        window.open("https://yourstory.com/people/girish-shivanna?origin=awards")
    }
    else if(aboutSelectValue=='FACULTIES'){
        document.getElementById("div2").remove();
       const seclect= document.getElementById("mainSection1")
      let table =document.createElement("table")
      seclect.appendChild(table)
      table.setAttribute("id","name")
      table.setAttribute("border","")
      console.log(table);
       table.innerHTML+=`<tr>
            <th>facultyName</th>
            <th>expert</th>
            <th>Image</th>
             </tr>`
       const fact=fetch("faculty.json")
      .then((x)=>x.json())
      .then((x)=>{
        x.map((x)=>{
            table.innerHTML+=`<tr>
        <td>${x.facultyName}</td>
        <td>${x.expert}</td>
        <td><img src="${x.Image}"></td>
         </tr>`
        })
      })
    
    }
    
}
