const sendMail=async e=>{e.preventDefault();let t=document.getElementById("input-name"),a=document.getElementById("input-email"),n=document.getElementById("input-message"),l=t.value,d=a.value,s=n.value,i=document.getElementById("contact-form-error"),m=new FormData;m.append("name",l),m.append("email",d),m.append("message",s);let p=await fetch("sendMail.php",{method:"POST",body:m}),u=await p.json();i.textContent=u.message,200===p.status&&(i.classList.replace("text-red-500","text-green-500"),t.value="",a.value="",n.value="")};document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("sendMail");e.addEventListener("click",sendMail)});