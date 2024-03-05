let form=document.querySelector("form");
async function getAllVoters(){
    let response=await axios.get("https://crudcrud.com/api/cf1b28f138d34b6984312e8b8371d26f/monitor"
    )
    for(let i of response.data){
        addtoList(i);
    }
}
getAllVoters()
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let inpVal=document.querySelector("input").value;
    let dropVal=document.querySelector("select").value;
    let voteDetails={
        monitor:dropVal,
        student:inpVal
    }
    axios.post("https://crudcrud.com/api/cf1b28f138d34b6984312e8b8371d26f/monitor",voteDetails
    ).then((res)=>{
        addtoList(voteDetails)
    }).catch((res)=>{
    })
    
})
function addtoList(voteDetails){
    let li=document.createElement("li");
    let deleteButton=document.createElement("button");
    deleteButton.innerText="Delete";
    li.append(voteDetails.student);
    li.append(deleteButton)
    let res=voteDetails.monitor.toLowerCase();
    let div=document.querySelector("."+res);
   let studentCount=parseInt(div.querySelector("span").innerHTML)+1;
   div.querySelector("span").innerHTML=""+studentCount
   div.querySelector("ul").append(li);
   deleteButton.addEventListener("click",()=>{
    deleteRequest(voteDetails)
    deleteData(deleteButton,div)
   })
}
function deleteData(deleteButton,div){
    deleteButton.parentElement.remove();
    div.querySelector("span").innerHTML=""+parseInt(div.querySelector("span").innerHTML)-1;
}
async function deleteRequest(voteDetails){
    let response=await axios.get("https://crudcrud.com/api/cf1b28f138d34b6984312e8b8371d26f/monitor"
    )
    let id;
    for(let i of response.data){
        if(i.student==voteDetails.student){
            id=i._id;
        }
    }
    let deteRequest=await axios.delete("https://crudcrud.com/api/cf1b28f138d34b6984312e8b8371d26f/monitor/"+id
    );
}