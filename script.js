var form= document.getElementById('inputform');
var list= document.getElementById('list');






form.addEventListener('submit', AddValues);
list.addEventListener('click',deletevalue);
list.addEventListener('click',editvalue);



function AddValues(e){
    e.preventDefault();

    if(document.getElementById('expense').value=="")
    {
        alert("Please Enter the Expense Amount");
        return;
    }
    else if(document.getElementById('description').value=="")
    {
        alert("Please Enter the Description");
        return;
    }
    else if(document.getElementById('category').selectedIndex==0)
    {
        alert("Please Enter the Category");
        return;
    }


    let amount= document.getElementById('expense').value;
    let description= document.getElementById('description').value;
    let categoryvalue= document.getElementById('category').value;
    let categorytext= document.getElementById('category').options[categoryvalue].text;


    // console.log(amount, description, categoryvalue, categorytext);

    let obj= {
        amount:amount,
        description:description,
        categoryvalue:categoryvalue,
        categorytext:categorytext
    }
    

    var objstring= JSON.stringify(obj);
    // console.log(objstring);

    localStorage.setItem(objstring,objstring);

    let newelement= document.createElement('li');
    newelement.className= "list-group-item";
    newelement.id= objstring;

    let spanelement= document.createElement('span');
    spanelement.appendChild(document.createTextNode(`Amount: ${amount} / Description: ${description} / Category: ${categorytext}`));

    let editbutton=document.createElement('button');
    editbutton.className="btn btn-success btn-sm edit float-end me-1"
    editbutton.appendChild(document.createTextNode('Edit'));

    let deletebutton=document.createElement('button');
    deletebutton.className="btn btn-danger btn-sm delete float-end  me-1";
    deletebutton.appendChild(document.createTextNode('X'));

    newelement.appendChild(spanelement);
    newelement.appendChild(deletebutton);
    newelement.appendChild(editbutton);

    list.appendChild(newelement);   


    document.getElementById('expense').value = ""
    document.getElementById('description').value= ""
    document.getElementById('category').selectedIndex=0;
  

    
}

function deletevalue(e){

   if( e.target.classList.contains('delete'))
    {
        let li= e.target.parentElement;
        list.removeChild(li);

        localStorage.removeItem(li.id);

        
    }
}

function editvalue(e){

    if( e.target.classList.contains('edit'))
     {

       

        let li= e.target.parentElement;

        let objstring1= localStorage.getItem(li.id);

        let obj1= JSON.parse(objstring1);

        document.getElementById('expense').value= obj1.amount;
        document.getElementById('description').value= obj1.description;
        document.getElementById('category').selectedIndex= obj1.categoryvalue;


       


        localStorage.removeItem(li.id);
        list.removeChild(li);
        

        
 
         
     }
 }