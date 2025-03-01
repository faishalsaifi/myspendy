var left= document.getElementById('left');

var right = document.getElementById('right');
var activeText=document.getElementById('activeText');

let defDate = new Date();
    let defDay = defDate.getDate();
    day.value=defDay;
    let defMonth = defDate.getUTCMonth()+1;
    month.value=defMonth;
    let defYear = defDate.getFullYear();
    year.value=defYear;

    
income.addEventListener('click',()=>{
if(document.getElementById('income').checked){

    left.style.background="#34d399";
    left.style.transition="all 0.3s";
  
   
    if(right.style.background="#ff8a80"){
        right.style.background="#fff";
    };
};
});

expense.addEventListener('click',()=>{
 if(document.getElementById('expense').checked){
    right.style.background="#ff8a80";
    right.style.transition="all 0.3s";
    left.classList.remove("active");
    activeText.classList.remove("incometext");
   
    if(left.style.background="#34d399"){
        left.style.background="#fff";

    };
};
});

let backBtn=document.getElementById('backbtn');
backBtn.addEventListener('click',()=>{
    let backCont = document.getElementById('back');

    if (backCont) {
        backCont.classList.add("fade-out"); // Apply animation
        setTimeout(() => {
            backCont.style.display = "none"; // Hide after animation
        }, 500);
    }
})


document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById('income').checked=true;
    const panel = document.getElementById('panel');
    const addBtn = document.getElementById('addBtn');
    panel.innerHTML = localStorage.getItem("trans") || "" ;
    updatebalance();
  
    document.getElementById('name').addEventListener('focus',()=>{

        if(document.getElementById('income').checked){
    document.getElementById('name').style.color="#34d399";
  
        }
        else if(document.getElementById('expense').checked){
            document.getElementById('name').style.color="#ff8a80";
    
        }
    })
    document.getElementById('amount').addEventListener('focus',()=>{
        if(document.getElementById('income').checked){
   
    document.getElementById('amount').style.color="#34d399";
        }
        else if(document.getElementById('expense').checked){
           
    document.getElementById('amount').style.color="#ff8a80";
        }
        
    })

    addBtn.addEventListener('mouseover',()=>{
        if(document.getElementById('income').checked){
            addBtn.style.background="#34d399";
         
            
            addtxt.style.color="#fff";
            
        }
        else if(document.getElementById('expense').checked){
            addBtn.style.background="#ff8a80"
            addtxt.style.color="#fff";
        }
    })
    addBtn.addEventListener('mouseout',()=>{
        addBtn.style.background="#fff";

        addtxt.style.color="transparent";
    })

    
   
    addBtn.addEventListener('click',()=>{
    const title= document.getElementById('name').value;
    const empty=document.getElementById('empty');
    let amount = parseInt(document.getElementById('amount').value) || 0;
    const day = document.getElementById('day').value;
    const month=document.getElementById('month').value;
    const year=document.getElementById('year').value;

    const date = day + "-" + month + "-" + year;
    if(title==="")return;
   
    const total = document.getElementById('balanceAmount');
    const totalInc = parseInt(document.getElementById('amount').value);
    const isIncome= document.getElementById('income').checked ;
   
    let transactionNode= document.createElement('div');
    transactionNode.classList.add(isIncome ? "incomeTrans" : "expenseTrans");
    transactionNode.setAttribute("data-amount",amount);
 transactionNode.innerHTML=`
    <div class="${isIncome ? "incomeTransCont":"expenseTransCont"}"  data-amount="${amount}">
    <div class="nodeTitle">
    <p class="nodeDate">${date}</p>
    <p class="${isIncome ? "inctext" : "exptext"}"> ${title}</p>
    
    </div>
    <p class="${isIncome ? "inctext" : "exptext"}">${isIncome ? "+" : "-"} ₹ ${amount}</p>
    </div>
    `
    let removebtn = document.createElement('button');
    removebtn.classList.add("delete-but");
    removebtn.innerHTML=`
    <i class="fa-solid fa-trash del-icon"></i>`;
    transactionNode.appendChild(removebtn);

    panel.appendChild(transactionNode)
    localStorage.setItem("trans",panel.innerHTML);

    let storedIncome= parseInt(localStorage.getItem("income")) || 0;
    let storedExpense= parseInt(localStorage.getItem("expense")) || 0;

    if(isIncome){
        storedIncome +=amount;
        localStorage.setItem("income",storedIncome);
    }
    else{
        storedExpense +=amount;
        localStorage.setItem("expense",storedExpense);

    }
    updatebalance(); 

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
});




document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete-but")){
       let transaction= e.target.parentElement;
       let updAmount=parseInt(transaction.getAttribute("data-amount")) || 0;


        let income= parseInt(localStorage.getItem("income")) || 0;
        let expense= parseInt(localStorage.getItem("expense")) || 0;

        if(transaction.classList.contains("incomeTrans")){
            income-=updAmount;

            localStorage.setItem("income",income);
        }
        else if(transaction.classList.contains("expenseTrans")){
            expense-=updAmount;
            localStorage.setItem("expense",expense);
        }
      
        transaction.remove();
        localStorage.setItem("trans", panel.innerHTML);
        updatebalance();
    }
});
function updatebalance(){
    let income= parseInt(localStorage.getItem("income")) || 0;
    let expense= parseInt(localStorage.getItem("expense")) || 0;
    let totalUpd = income-expense;
    document.getElementById('balanceAmount').innerHTML=` 
    <h1 class="balance-amount">₹ ${totalUpd}</h1>`
    localStorage.setItem("total",totalUpd);
}



});






