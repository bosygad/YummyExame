

let row = document.getElementById('row')
let array =[];
let menuWidthe = $('.menu').outerWidth()
let loading = document.querySelector('.loanding')

function open() {
    $(".menu").animate({
        left: 0
    }, 500),$('.option').animate({
                     left: 195},500)
    document.querySelector('.fa-bars').style.display = 'none'
  document.querySelector('.fa-xmark').style.display= 'block'


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function close() {
   
    $(".menu").animate({
        left: -menuWidthe
    }, 500)

    document.querySelector('.fa-bars').style.display = 'block'
    document.querySelector('.fa-xmark').style.display= 'none'


    $(".links li").animate({
        top: 300
    }, 500),$('.option').animate({
        left: 0},300)
    $('.links li').animate({
        top:300
    },500)    
}

close()
$(".option").click(() => {
    if ($(".menu").css("left") == "0px") {
        close()
    } else {
        open()
    }
})

  

// api
async function getApi(){
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    let respnse = await url.json()

    console.log(respnse);
    array = respnse.meals
    console.log(array);
    
    displayMeals()
    $('.loanding').fadeOut(500).css({
        display : none
    })


}
getApi()

function displayMeals(){
    let box ='';
    for(let i = 0; i< array.length; i++){
        box +=`<div class="col-md-3">
        <div class="mail-item position-relative rounded-2 overflow-hidden " data-id="${array[i].idMeal}" ">
          
            <img src="${array[i].strMealThumb}" class="w-100" alt="">
         
            <div class="mail-overlay position-absolute d-flex  align-items-center  p-2">
                
                    <h2>${array[i].strMeal}</h2>
             
            </div>
        </div>
    </div>` 
    }
    row.innerHTML = box
    document.querySelectorAll('.mail-item').forEach(function(item){
        item.addEventListener('click',function(e){
          let term = item.dataset.id
          console.log(term);
          getDetailsApi(term)
        })
    })
}
// deatails
async function getDetailsApi(id){
    $('.loanding').fadeIn(500)
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let respnse = await url.json()

    console.log(respnse);
    array = respnse.meals
    console.log(array);
   
    displayDetailsMeals(array[0])
    $('.loanding').fadeOut(500)
    

 


}


function displayDetailsMeals(meal){
   
    let ingredients = ''

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if(!tags) tags = []
    let strTags ='';
    for (let i = 0; i < tags.length; i++) {
       
            strTags += `<li class="alert alert-info m-2 p-1">${tags[i]}</li>`
        
    }
    let box ='';
   
        box +=`  <div class="detail text-white d-flex">
        <div class="col-md-4">
            <img src="${meal.strMealThumb}" class="w-100 pe-5" alt="">
            <h1>${meal.strMeal}</h1>
         </div>
         <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <p>Area:<span>${meal.strArea}</span></p>
            <p>Category:<span>${meal.strCategory}</span></p>
            <p>Recipes:</p>
            <ul class="list-unstyled d-flex flex-wrap g-3">
            ${ingredients}</ul>
            <h2 class="m-2">tags:</h2>
            <ul class="list-unstyled d-flex flex-wrap g-3">
            ${strTags}</ul>
            <a href="${meal.strSource}" target="_blank" class="btn p-1 m-1 bg-success" >source</a>
            <a href="${meal.strYoutube}" target="_blank" class="btn p-1 m-1 bg-danger">youtube</a>
           
         </div>

       </div>` 
    
    row.innerHTML = box

  
    
}

//search 
function search(){
  let box ='';
  box+=` <div class="row py-4 ">
  <div class="col-md-6 ">
      <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
  </div>
  <div class="col-md-6">
      <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
  </div>
</div>`
  

    document.getElementById('search').innerHTML = box
    row.innerHTML = ""
    close()

}
async function searchByName(name){
    $('.loanding').fadeIn(500)
    row.innerHTML = ""
    
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let respnse = await url.json()

    console.log(respnse);
    array = respnse.meals
    console.log(array);
    displayMeals()
    $('.loanding').fadeOut(500)
    
}
async function searchByLetter(letter){
    $('.loanding').fadeIn(500)
    row.innerHTML = ""
    letter == ""? letter ="a": "";
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let respnse = await url.json()
    
    console.log(respnse);
    array = respnse.meals
    console.log(array);
    displayMeals()
    $('.loanding').fadeOut(500)
}


//categories
async function getCatApi(){
    $('.loanding').fadeIn(500)
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let respnse = await url.json()

    console.log(respnse);
    array = respnse.categories
    console.log(array);
    displayCatMeals()
    $('.loanding').fadeOut(500)

}
async function getCatApiMeal(cat){
    $('.loanding').fadeIn(500)
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    let respnse = await url.json()

    console.log(respnse);
    array = respnse.meals
    console.log(array);
    displayMeals(cat)
    $('.loanding').fadeOut(500)
}


function displayCatMeals(){

    
    let box ='';
    for(let i = 0; i<array.length; i++){
        box +=`<div class="col-md-3 ">
        <div class="mail-item position-relative overflow-hidden ")>
            <img src="${array[i].strCategoryThumb}" class="w-100 rounded" alt="">
            <div class="mail-overlay position-absolute d-flex  align-items-center rounded p-2 "  >
                <div class="mailName">
                    <h2 class="text-center"  data-Cat='${array[i].strCategory}'">${array[i].strCategory}</h2>
                    <p  data-Cat='${array[i].strCategory}'">${(array[i].strCategoryDescription)? array[i].strCategoryDescription.split(' ').slice(0 , 20).join(' '):'no desc'}</p>
                </div>
            </div>
        </div>
    </div>` 
    }
    row.innerHTML = box
    document.querySelectorAll('.mail-item').forEach(function(cat){
        cat.addEventListener('click',function(e){
            let term = e.target.getAttribute('data-Cat')
            console.log(term);
            getCatApiMeal(term)
        })
    })

  close()
}



// area
async function AreaApi(){
    $('.loanding').fadeIn(500)
    let url = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let respnse = await url.json()

    console.log(respnse);
    array = respnse.meals
    console.log(array);
    displayAreaMeals()
    $('.loanding').fadeOut(500)

}

function displayAreaMeals(){
    let box ='';
    for(let i = 0; i<array.length; i++){
        box +=`<div class="col-md-3 d-flex justify-content-center">
        <div class="country text-white"'>
        <i class="fa-solid fa-house-laptop text-white" style="font-size: 90px; cursor: pointer;"></i>
        <p style="font-size: 30px; cursor: pointer;" onclick='' class="area"  data-area='${array[i].strArea}'>${array[i].strArea}</p>
     </div>
    </div>` 
    }
    row.innerHTML = box      
    let area = document.querySelectorAll('.area')
    area.forEach(function(area){
        area.addEventListener('click',function(e){
            let term = e.target.getAttribute('data-area')
            console.log(term);
            getAreaApiMeal(term)
    
        })
    })
   
    close()

}
async function getAreaApiMeal(area){
    $('.loanding').fadeIn(500)
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let respnse = await url.json()

    console.log(respnse);
    array = respnse.meals
    console.log(array);
    displayMeals(area)
    $('.loanding').fadeOut(500)
}

// Ingredients
async function IngredientsApi(){
    $('.loanding').fadeIn(500)
    let url = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let respnse = await url.json()

    console.log(respnse);
    array = respnse.meals
    console.log(array);
    displayIngredients()
    $('.loanding').fadeOut(500)

}

async function getIngredMeal(Ingred){
    $('.loanding').fadeIn(500)
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingred}`)
    let respnse = await url.json()

    console.log(respnse);
    array = respnse.meals
    console.log(array);
    displayMeals(Ingred)
    $('.loanding').fadeOut(500)

}
function displayIngredients(){
    let box ='';
    for(let i = 0; i<array.length; i++){
        box +=`<div class="col-md-3 d-flex justify-content-center">
        <div class="Inge text-white text-center" >
        <i class="fa-solid fa-drumstick-bite"" style="font-size: 90px; cursor: pointer;"></i>
        <p style="font-size: 30px; cursor: pointer;" class='Ing' data-ing='${array[i].strIngredient}' >${array[i].strIngredient}</p>
        <p>${(array[i].strDescription)? array[i].strDescription.split(' ').slice(0 , 20).join(' '):'no desc'}</p>
     </div>
    </div>` 
    }
    row.innerHTML = box
   
close()
       let ing = document.querySelectorAll('.Ing')
       ing.forEach(function(ing){
           ing.addEventListener('click',function(e){
               let term = e.target.getAttribute('data-ing')
               console.log(term);
               getIngredMeal(term)
       
           }) 
       }) 
}



//contact

function showcontact(){
  
  let box ='';
  box +=`   <div class="vh-100 d-flex align-items-center">
  <div class="container  w-75  text-center g-4">
      <div class="contact " id="contact">
          <div class="row justify-content-center align-items-center g-4">
              <div class="col-md-6">
                  <input type="text" id="nameInput" onkeyup="inputValidation()" class="form-control" placeholder="Enter your name">
                  <div class="alert d-none alert-danger mt-2 w-100 " id="nameAlert">Special characters and numbers
                      not allowed</div>
              </div>
              <div class="col-md-6">
                  <input type="email" id="emailInput" onkeyup="inputValidation()" class="form-control" placeholder="Enter your Email">
                  <div class="alert d-none  alert-danger mt-2 w-100 " id="emailAlert">Email not valid
                      *exemple@yyy.zzz</div>
            
              </div>
              <div class="col-md-6">
                  <input type="text" id="phoneInput" onkeyup ="inputValidation()" class="form-control" placeholder="Enter your phone">
                  <div class="alert d-none alert-danger mt-2 w-100 " id="phoneAlert">Enter valid Phone Number</div>
            
              </div>
              <div class="col-md-6">
                  <input type="number" id="AgeInput" onkeyup ="inputValidation()" class="form-control" placeholder="Enter your Age">
                  <div class="alert d-none  alert-danger mt-2 w-100 " id="ageAlert">Enter valid age</div>
            
              </div>
              <div class="col-md-6">
                  <input type="password" id="passwordInput" onkeyup ="inputValidation()" class="form-control"
                      placeholder="Enter your password">
                  <div class="alert d-none  alert-danger mt-2 w-100 " id="passwordAlert">Enter valid password
                      *Minimum eight characters, at least one letter and one number:*</div>
            
              </div>
              <div class="col-md-6">
                  <input type="password" id="repasswordInput" onkeyup ="inputValidation()" class="form-control" placeholder="repassword">
                  <div class="alert d-none  alert-danger mt-2 w-100 " id="repasswordAlert">Enter valid repassword
                  </div>
            
              </div>
            
            </div>
            <button class="btn border border-danger m-4 disabled text-danger" id="btnSubmit">submit</button>
         

      </div>
  </div>


</div>
`
row.innerHTML = box;
let submitBtn = document.getElementById('btnSubmit')
document.getElementById('nameInput').addEventListener('focus',()=>{
    nameInput = true
})
document.getElementById('emailInput').addEventListener('focus',()=>{
    emailInput = true
})
document.getElementById('phoneInput').addEventListener('focus',()=>{
    phoneInput = true
})
document.getElementById('AgeInput').addEventListener('focus',()=>{
    AgeInput = true
})
document.getElementById('passwordInput').addEventListener('focus',()=>{
    passwordInput = true
})
document.getElementById('repasswordInput').addEventListener('focus',()=>{
    repasswordInput = true
})


close()
}
let nameInput = false;
let emailInput = false;
let phoneInput =false;
let AgeInput =false;
let passwordInput =false;
let repasswordInput = false;


function nameValidation(){
   let nameRegex = /^[a-zA-Z ]+$/gm
   return (nameRegex.test(document.getElementById('nameInput').value))
}
function emailValidation(){
    let emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm
    return emailRegex.test(document.getElementById('emailInput').value)
 }
 function phoneValidation(){
    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return phoneRegex.test(document.getElementById('phoneInput').value)
 }
 function ageValidation(){
    let ageRegex = /^[1-9]?[0-9]{1}$|^100$/
    return ageRegex.test(document.getElementById('AgeInput').value)
 }
 function passworValidation(){
    let passworRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    return passworRegex.test(document.getElementById('passwordInput').value)
 }

 function rePassworValidation(){
   
    return document.getElementById('repasswordInput').value == document.getElementById('passwordInput').value
 }

 function inputValidation(){
 
  if(nameInput){
    if(nameValidation()){
        document.getElementById('nameAlert').classList.replace('d-block','d-none')
    }
    else{
        document.getElementById('nameAlert').classList.replace('d-none','d-block')
    }
  }
   
   if(emailInput){
    if(emailValidation()){
        document.getElementById('emailAlert').classList.replace('d-block','d-none')
    }
    else{
        document.getElementById('emailAlert').classList.replace('d-none','d-block')
    }
   }
   if(phoneInput){
    if(phoneValidation()){
        document.getElementById('phoneAlert').classList.replace('d-block','d-none')
    }
    else{
        document.getElementById('phoneAlert').classList.replace('d-none','d-block')
    }
   }
  if(AgeInput){
    if(ageValidation()){
        document.getElementById('ageAlert').classList.replace('d-block','d-none')
    }
    else{
        document.getElementById('ageAlert').classList.replace('d-none','d-block')
    }
  }
if(passwordInput){
    if(passworValidation()){
        document.getElementById('passwordAlert').classList.replace('d-block','d-none')
    }
    else{
        document.getElementById('passwordAlert').classList.replace('d-none','d-block')
    }
}
if(repasswordInput){
    if(rePassworValidation()){
        document.getElementById('repasswordAlert').classList.replace('d-block','d-none')
    }
    else{
        document.getElementById('repasswordAlert').classList.replace('d-none','d-block')
    }
}
    if(nameValidation() && emailValidation() && phoneValidation() &&ageValidation()&&passworValidation()&&rePassworValidation()){
  document.getElementById('btnSubmit').classList.remove('disabled')
    }
    else{
  document.getElementById('btnSubmit').add('disabled')
        
    }
}
