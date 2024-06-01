let searched_recipe=document.getElementById("search-recipe");
let searching_button=document.getElementById("search-button");
let text_para=document.querySelector(".text");
let listofitems=document.getElementById("list-of-items")


let recipes=async(itemname)=>{ 
try{

    let items=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+itemname);
    searched_recipe.value=""
    text_para.textContent="Fetching Recipes..."
    let response=await items.json()
    console.log(response);
   text_para.textContent="Your Recipes..."
    for (let meal of response.meals){
        let mealcontainer=document.createElement("div")
        mealcontainer.classList.add('mealcontainer')
        listofitems.appendChild(mealcontainer)
        let mealimg=document.createElement("img");
        mealimg.src=meal.strMealThumb;
        mealcontainer.appendChild(mealimg);
        console.log(meal.strMeal)
        let mealname=document.createElement("h2");
        mealname.textContent=meal.strMeal;
        mealcontainer.appendChild(mealname);

        let mealCategory=document.createElement("p");
        mealCategory.textContent=meal.strCategory;
        mealcontainer.appendChild(mealCategory)

        let mealarea=document.createElement("p");
        mealarea.textContent=meal.strArea;
        mealcontainer.appendChild(mealarea)

        let viewmorebutton=document.createElement("button");
        viewmorebutton.textContent="View More";
        viewmorebutton.classList.add("view-button");
        mealcontainer.appendChild(viewmorebutton)
    
        viewmorebutton.onclick=function(){
            let fulldetails=document.createElement("div")
            fulldetails.classList.add("recipe-details")
            document.body.appendChild(fulldetails)
            let closer=document.createElement("i")
            closer.classList.add("fas","fa-times","close")
            fulldetails.appendChild(closer)

            closer.onclick=function(){
                fulldetails.classList.add("end")
            }
            let meal_name=document.createElement("h2");
            fulldetails.appendChild(meal_name);
            meal_name.classList.add("color")
            meal_name.textContent=meal.strMeal;
            let heading=document.createElement("h4");
            heading.textContent="Ingredients"
            fulldetails.appendChild(heading)
            
            for (i=1;i<=10;i++){
               let ingredient=document.createElement("p");
                ingredient.textContent=meal["strIngredient"+i]
                fulldetails.appendChild(ingredient)

            }
        }
    }
    
    
    }
        catch(error){
            text_para.textContent = "No Such Recipes Found..."; 
            
        }
       
    }
   
    

searching_button.addEventListener("click",function(event){
   event.preventDefault()
   listofitems.textContent=""
   console.log("clicked")
    if (searched_recipe.value===""){
        text_para.textContent="Try to search recipes....";
    }
    else{
        recipes(searched_recipe.value)
    }
})
