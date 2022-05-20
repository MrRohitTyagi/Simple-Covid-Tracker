let place = document.querySelector('.place');
let active = document.querySelector('.active');
let critical = document.querySelector('.critical');
let recovered = document.querySelector('.recovered');
let total = document.querySelector('.total');
let totalD = document.querySelector('.totalD');
let totaltests = document.querySelector('.totaltests');
let pop = document.querySelector('.pop');
let all = document.querySelector('.all');

let input = document.querySelector('.inp');
// console.log(input.value);
let button = document.querySelector('.but');

let totalDper1m = document.querySelector('.totalDper1m');
let totalper1m = document.querySelector('.totalper1m');

let marque = document.querySelector('.marq');







const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
		'X-RapidAPI-Key': '7b18740137msh4be1b00d17fda6bp1bbccfjsndafb6bd5ced1'
	}
};

// fetch('https://covid-193.p.rapidapi.com/statistics?country=India', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response.response[0]))

    async function allcont(){
        const Contries = await fetch(`https://covid-193.p.rapidapi.com/countries`, options)
        let s = "india "
        const AllContries = await Contries.json();
        console.log(AllContries.response);
        AllContries.response.forEach(e => {
            s = s +" "+e
        });
        console.log(s);
        marque.innerHTML = s


        console.log(AllContries.response);
    }

    getRes("india")
    allcont()
    async function getRes(txt){

        
        const response = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=${txt}`, options)
        const data = await response.json();
        console.log(data.response.length);
        console.log(data);
        const res = data.response[0]

        if(data.response.length != 0){

            
            place.innerHTML = "Location : " + data.parameters.country.toUpperCase()
        pop.innerHTML = "Total Population : " +  data.response[0].population
        active.innerHTML = "Active Cases : " +  res.cases.active
        critical.innerHTML ="Critical cases : " +  res.cases.critical
        recovered.innerHTML ="Recovered cases : " +  res.cases.recovered
        total.innerHTML ="Total Cases : " +  res.cases.total

        totalD.innerHTML ="Total Deaths : " +  res.deaths.total
        totalDper1m.innerHTML = "Deaths / 1 mil : " + res.deaths["1M_pop"]

        totalper1m.innerHTML = "Tests / 1 mil : " + res.tests["1M_pop"]
        
        totaltests.innerHTML ="Total Tests : " +  res.tests.total
        
    }else{
        all.style.display="none"
        pop.innerHTML = "Total Population : "+" NA"
        place.innerHTML = "Location : "+input.value

    }
        
        
    }

    input.addEventListener('keypress',(e)=>{
        if(e.key == 'Enter'){
            getRes(input.value)
        }
    })

    button.addEventListener("click",()=>{
        getRes(input.value)
    })

    

    