const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const random = document.querySelector("#random");
const mealsEl = document.querySelector("#meals");
const resultHeading = document.querySelector("#result-heading");
const single_mealEl = document.querySelector("#single-meal");

function searchMeal(e){
    e.preventDefault();

    //Clear single Meal
    single_mealEl.innerHTML="";

    //get search term
    const term = search.value;
    // console.log(term);

    if(term.trim()){
        fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            resultHeading.innerHTML=`<h2>Search result for '${term}':</h2>`;
            if(data.meals === null){
                resultHeading.innerHTML= `<p>There are no such results for ${term}. Try again!</p>`;                
            mealsEl.innerHTML="";
            }
            else{
                resultHeading.innerHTML= data.meals.map((meal) =>
                `<div class="meal">
                <img src= "${meal.strMealThumb}" alt=${meal.strMeal}/>
                <div class="meal-info" data-mealId="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
                </div>
                </div>`).join("");
            }
        });

        //clear search text
        search.value="";
    }
    else{
        alert("Please enter a search value!");
    }
}

//displaying selected meal from list
function getMealById(mealId){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
        const meal = data.meals[0];
        // console.log(meal);
        addMealtoDom(meal);
    });
}

//fetch random meals
function getRandomMeals(e){
    mealsEl.innerHTML="";
    resultHeading.innerHTML="";
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
        const meals = data.meals[0];
        addMealtoDom(meals);
    });
}

function addMealtoDom(meal){
    const ingredients= [];
    for(let i=1; i<21; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        }else{
            break;
    }
}

// console.log(ingredients);

single_mealEl.innerHTML = `
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class= "single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
    <p>
    ${meal.strInstructions}
    </p>
    <h2>Ingredients</h2>
    <ul>${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    </div>
    </div>
    `;
}

submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", (e) => {
    const mealInfo = e.path.find((item) => {
        if(item.classList){
            return item.classList.contains("meal-info");
        }else{
            return false;
        }
    });
    // console.log(mealInfo);

    if(mealInfo){
        const mealId = mealInfo.getAttribute("data-mealId");
        console.log(mealId);
        getMealById(mealId);
    }
});

random.addEventListener("click", getRandomMeals);